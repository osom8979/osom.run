import {createMiddlewareClient} from '@supabase/auth-helpers-nextjs';
import type {NextRequest} from 'next/server';
import {NextResponse} from 'next/server';
import {
  findNextLanguage,
  invalidLngPathname,
  upgradeI18nCookies,
} from '@/app/libs/i18n/middle';

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

const progressMatcher = /^\/progress\/[0-9A-Za-z-_]*/;
const progressRewritePrefix = '/api/anonymous';
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
  const sessionResponse = await supabase.auth.getSession();
  const session = sessionResponse?.data?.session ?? undefined;

  // Redirect if 'lng' is not in the pathname.
  if (invalidLngPathname(req)) {
    const lng = findNextLanguage({req, session});
    const pathname = req.nextUrl.pathname;
    const search = req.nextUrl.search;

    console.assert(pathname.startsWith('/'));
    const redirectUrl = new URL(`/${lng}${pathname}${search}`, req.url);

    console.debug(`middleware(req='${req.url}') lng redirect '${redirectUrl}'`);
    return NextResponse.redirect(redirectUrl);
  }

  const method = req.method.toUpperCase();
  if (method === 'POST') {
    const pathname = req.nextUrl.pathname.substring(3);
    if (pathname.match(progressMatcher)) {
      const rewriteUrl = new URL(`${progressRewritePrefix}${pathname}`, req.url);
      console.debug(`middleware(req='${req.url}') api rewrite '${rewriteUrl}'`);
      return NextResponse.rewrite(rewriteUrl);
    }
  }

  upgradeI18nCookies(req, res);

  console.debug(`middleware(req='${req.url}') -> ${res.status}`);
  return res;
}
