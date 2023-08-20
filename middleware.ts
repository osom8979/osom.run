import {createMiddlewareClient} from '@supabase/auth-helpers-nextjs';
import acceptLanguage from 'accept-language';
import {RequestCookie} from 'next/dist/compiled/@edge-runtime/cookies';
import type {NextRequest} from 'next/server';
import {NextResponse} from 'next/server';
import {fallbackLng, languages} from '@/app/i18n/settings';

acceptLanguage.languages(languages);

export const config = {
  // matcher: '/:lng*'
  matcher: ['/((?!api|_next/static|_next/image|assets|favicon.ico|sw.js).*)'],
};

async function upgradeSessionCookies(req: NextRequest, res: NextResponse) {
  // Create a Supabase client configured to use cookies
  const supabase = createMiddlewareClient({req, res});

  // Refresh session if expired - required for Server Components
  // https://supabase.com/docs/guides/auth/auth-helpers/nextjs#managing-session-with-middleware
  await supabase.auth.getSession();
}

const HEADER_ACCEPT_LANGUAGE_KEY = 'Accept-Language';
const HEADER_REFERER_KEY = 'referer';
const I18N_COOKIE_NAME = 'i18n';

function nextLanguage(req: NextRequest): string {
  let lng;
  if (req.cookies.has(I18N_COOKIE_NAME)) {
    const cookie = req.cookies.get(I18N_COOKIE_NAME) as RequestCookie;
    lng = acceptLanguage.get(cookie.value);
  }
  if (!lng) {
    lng = acceptLanguage.get(req.headers.get(HEADER_ACCEPT_LANGUAGE_KEY));
  }
  if (!lng) {
    lng = fallbackLng;
  }
  console.assert(typeof lng === 'string');
  return lng;
}

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();
  await upgradeSessionCookies(req, res);

  const lng = nextLanguage(req);

  // Redirect if lng in path is not supported
  const hasLng = languages.some(x => req.nextUrl.pathname.startsWith(`/${x}`));
  const isAssetUrl = req.nextUrl.pathname.startsWith('/_next');
  if (!hasLng && !isAssetUrl) {
    return NextResponse.redirect(new URL(`/${lng}${req.nextUrl.pathname}`, req.url));
  }

  if (req.headers.has(HEADER_REFERER_KEY)) {
    const referer = req.headers.get(HEADER_REFERER_KEY) as string;
    const refererUrl = new URL(referer);
    const lngInReferer = languages.find(l => refererUrl.pathname.startsWith(`/${l}`));
    if (lngInReferer) {
      res.cookies.set(I18N_COOKIE_NAME, lngInReferer);
    }
  }

  return res;
}
