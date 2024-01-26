import acceptLanguage from 'accept-language';
import {RequestCookie} from 'next/dist/compiled/@edge-runtime/cookies';
import {NextRequest, NextResponse} from 'next/server';
import {
  COOKIE_I18N_KEY,
  FALLBACK_LANGUAGE,
  HEADER_ACCEPT_LANGUAGE_KEY,
  HEADER_REFERER_KEY,
  LANGUAGES,
} from '@/app/libs/i18n/settings';

acceptLanguage.languages(LANGUAGES);

export function hasLng(req: NextRequest) {
  return LANGUAGES.some(lng => req.nextUrl.pathname.startsWith(`/${lng}`));
}

export function invalidLngPath(req: NextRequest) {
  return !hasLng(req);
}

export function findNextLanguage(
  req: NextRequest,
  acceptLanguageHeader = HEADER_ACCEPT_LANGUAGE_KEY,
  i18nCookie = COOKIE_I18N_KEY
): string {
  let lng: string | null | undefined;

  if (req.cookies.has(i18nCookie)) {
    const cookie = req.cookies.get(i18nCookie) as RequestCookie;
    lng = acceptLanguage.get(cookie.value);
  }

  if (!lng) {
    lng = acceptLanguage.get(req.headers.get(acceptLanguageHeader));
  }

  if (!lng) {
    lng = FALLBACK_LANGUAGE;
  }

  return lng;
}

export function upgradeI18nCookies(
  req: NextRequest,
  res: NextResponse,
  refererHeader = HEADER_REFERER_KEY,
  i18nCookie = COOKIE_I18N_KEY
) {
  if (!req.headers.has(refererHeader)) {
    return;
  }

  const refererPath = req.headers.get(refererHeader) as string;
  const refererUrl = new URL(refererPath);
  const lngInReferer = LANGUAGES.find(lng => refererUrl.pathname.startsWith(`/${lng}`));
  if (!lngInReferer) {
    return;
  }

  res.cookies.set(i18nCookie, lngInReferer);
}
