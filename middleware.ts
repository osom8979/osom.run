import type {NextRequest} from 'next/server';
import {NextResponse} from 'next/server';
import {upgradeSessionCookies} from '@/app/lib/auth/middle';
import {findNextLanguage, invalidPath, upgradeI18nCookies} from '@/app/lib/i18n/middle';

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

export async function middleware(req: NextRequest) {
  // Redirect if lng in path is not supported
  if (invalidPath(req)) {
    const lng = findNextLanguage(req);
    const nextPath = req.nextUrl.pathname;
    console.assert(nextPath.startsWith('/'));

    const redirectPath = `/${lng}${nextPath}`;
    const redirectUrl = new URL(redirectPath, req.url);

    console.debug(`middleware(req='${req.url}') redirect '${redirectUrl}'`);
    return NextResponse.redirect(redirectUrl);
  }

  const res = NextResponse.next();
  upgradeI18nCookies(req, res);
  await upgradeSessionCookies(req, res);

  console.debug(`middleware(req='${req.url}')`, res);
  return res;
}
