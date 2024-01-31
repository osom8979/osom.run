import {createMiddlewareClient} from '@supabase/auth-helpers-nextjs';
import type {NextRequest} from 'next/server';
import {NextResponse} from 'next/server';
import {getProfile} from '@/app/libs/supabase/metadata';
import {
  findNextLanguage,
  invalidLngPath,
  upgradeI18nCookies,
} from '@/app/libs/i18n/middle';
import {LANGUAGES} from '@/app/libs/i18n/settings';

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     *
     * https://nextjs.org/docs/app/building-your-application/routing/middleware#matcher
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};

const languageValues = [...LANGUAGES] as Array<string>;
const progressRunnerMatcher = /^\/progress\/[0-9A-Za-z-_]*/;
const matchers = config.matcher.map(pattern => new RegExp(pattern));

function validMiddlewareRequest(req: NextRequest) {
  const pathname = req.nextUrl.pathname;
  for (const re of matchers) {
    if (re.test(pathname)) {
      return true;
    }
  }
  return false;
}

export async function middleware(req: NextRequest) {
  console.assert(validMiddlewareRequest(req));

  const res = NextResponse.next();
  const supabase = createMiddlewareClient({req, res});
  const session = await supabase.auth.getSession();
  const hasSession = session.error === null;

  // Redirect if lng in path is not supported
  if (invalidLngPath(req)) {
    const search = req.nextUrl.search;
    const pathname = req.nextUrl.pathname;
    console.assert(pathname.startsWith('/'));

    if (hasSession && session.data !== null && session.data.session !== null) {
      const userLng = getProfile(session.data.session.user).lng;
      if (userLng && languageValues.includes(userLng)) {
        const redirectUrl = new URL(`/${userLng}${pathname}${search}`, req.url);
        console.debug(`middleware(req='${req.url}') session redirect '${redirectUrl}'`);
        return NextResponse.redirect(redirectUrl);
      }
    }

    const lng = findNextLanguage(req);
    const redirectUrl = new URL(`/${lng}${pathname}${search}`, req.url);
    console.debug(`middleware(req='${req.url}') lng redirect '${redirectUrl}'`);
    return NextResponse.redirect(redirectUrl);
  }

  const method = req.method.toUpperCase();
  if (method === 'POST') {
    const pathname = req.nextUrl.pathname.substring(3);
    if (pathname.match(progressRunnerMatcher)) {
      const rewriteUrl = new URL(`/api${pathname}`, req.url);
      console.debug(`middleware(req='${req.url}') api rewrite '${rewriteUrl}'`);
      return NextResponse.rewrite(rewriteUrl);
    }
  }

  upgradeI18nCookies(req, res);

  console.debug(`middleware(req='${req.url}') -> ${res.status}`);
  return res;
}
