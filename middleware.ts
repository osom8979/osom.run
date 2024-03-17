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

interface RewriteMatcher {
  matcher: RegExp;
  prefix: string;
}

const POST_REWRITE_MATCHERS = [
  {
    matcher: /^\/progress\/[0-9A-Za-z-_]*/,
    prefix: '/api/anonymous',
  },
] as Array<RewriteMatcher>;

const VALID_MATCHERS = config.matcher.map(pattern => new RegExp(pattern));

function validMiddlewareRequest(req: NextRequest) {
  const pathname = req.nextUrl.pathname;
  for (const re of VALID_MATCHERS) {
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
  const sessionResult = await supabase.auth.getSession();
  const user = sessionResult?.data?.session?.user;

  // Redirect if 'lng' is not in the pathname.
  if (invalidLngPathname(req)) {
    const lng = findNextLanguage({req, user});
    const pathname = req.nextUrl.pathname;
    const search = req.nextUrl.search;

    console.assert(pathname.startsWith('/'));
    const redirectUrl = new URL(`/${lng}${pathname}${search}`, req.url);

    console.debug(`middleware(req='${req.url}') lng redirect '${redirectUrl}'`);
    return NextResponse.redirect(redirectUrl);
  }

  // Some 'POST' requests require rewriting.
  if (req.method.toUpperCase() === 'POST') {
    const pathnameWithoutLng = req.nextUrl.pathname.substring(3);
    for (const prm of POST_REWRITE_MATCHERS) {
      if (pathnameWithoutLng.match(prm.matcher)) {
        const rewriteUrl = new URL(`${prm.prefix}${pathnameWithoutLng}`, req.url);
        console.debug(`middleware(req='${req.url}') post rewrite '${rewriteUrl}'`);
        return NextResponse.rewrite(rewriteUrl);
      }
    }
  }

  upgradeI18nCookies(req, res);

  console.debug(`middleware(req='${req.url}') -> ${res.status}`);
  return res;
}
