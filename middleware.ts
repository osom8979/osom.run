import type {NextRequest} from 'next/server';
import {NextResponse} from 'next/server';
import {upgradeSessionCookies} from '@/app/libs/auth/middle';
import {
  findNextLanguage,
  invalidLngPath,
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

  // Redirect if lng in path is not supported
  if (invalidLngPath(req)) {
    const lng = findNextLanguage(req);
    const pathname = req.nextUrl.pathname;
    console.assert(pathname.startsWith('/'));
    const redirectPath = `/${lng}${pathname}`;
    const redirectUrl = new URL(redirectPath, req.url);

    console.debug(`middleware(req='${req.url}') redirect '${redirectUrl}'`);
    return NextResponse.redirect(redirectUrl);
  }

  const res = NextResponse.next();
  upgradeI18nCookies(req, res);
  await upgradeSessionCookies(req, res);

  console.debug(`middleware(req='${req.url}') -> ${res.status}`);
  return res;
}
