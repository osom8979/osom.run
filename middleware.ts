import {createMiddlewareClient} from '@supabase/auth-helpers-nextjs';
import type {NextRequest} from 'next/server';
import {NextResponse} from 'next/server';
import {nextLanguage, upgradeI18nCookies, validatePath} from '@/app/i18n/helpers';

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

async function upgradeSessionCookies(req: NextRequest, res: NextResponse) {
  // Create a Supabase client configured to use cookies
  const supabase = createMiddlewareClient({req, res});

  // Refresh session if expired - required for Server Components
  // https://supabase.com/docs/guides/auth/auth-helpers/nextjs#managing-session-with-middleware
  await supabase.auth.getSession();
}

export async function middleware(req: NextRequest) {
  // Redirect if lng in path is not supported
  if (!validatePath(req)) {
    const lng = nextLanguage(req);
    console.assert(req.nextUrl.pathname.startsWith('/'));
    const redirectUrl = new URL(`/${lng}${req.nextUrl.pathname}`, req.url);
    return NextResponse.redirect(redirectUrl);
  }

  const res = NextResponse.next();
  upgradeI18nCookies(req, res);

  await upgradeSessionCookies(req, res);

  return res;
}
