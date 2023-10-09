import acceptLanguage from 'accept-language';
import {RequestCookie} from 'next/dist/compiled/@edge-runtime/cookies';
import {NextRequest, NextResponse} from 'next/server';
import {fallbackLng, languages} from '@/app/lib/i18n/settings';

acceptLanguage.languages(languages);

const HEADER_ACCEPT_LANGUAGE_KEY = 'Accept-Language';
const HEADER_REFERER_KEY = 'referer';
const COOKIE_I18N_KEY = 'i18n';
const IGNORE_PATHS = ['/api', '/_next', 'favicon.ico'];

export function hasLng(req: NextRequest) {
  return languages.some(lng => req.nextUrl.pathname.startsWith(`/${lng}`));
}

export function hasIgnore(req: NextRequest) {
  return IGNORE_PATHS.some(path => req.nextUrl.pathname.startsWith(path));
}

export function validPath(req: NextRequest) {
  return hasLng(req) || hasIgnore(req);
}

export function invalidPath(req: NextRequest) {
  return !validPath(req);
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
    lng = fallbackLng;
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
  const lngInReferer = languages.find(lng => refererUrl.pathname.startsWith(`/${lng}`));
  if (!lngInReferer) {
    console.debug(`Has referer lng: ${lngInReferer}`);
    return;
  }

  console.debug(`Update i18n cookie: ${i18nCookie} -> ${lngInReferer}`);
  res.cookies.set(i18nCookie, lngInReferer);
}
