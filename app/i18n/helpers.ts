import acceptLanguage from 'accept-language';
import {RequestCookie} from 'next/dist/compiled/@edge-runtime/cookies';
import {NextRequest, NextResponse} from 'next/server';
import {fallbackLng, languages} from '@/app/i18n/settings';

acceptLanguage.languages(languages);

const HEADER_ACCEPT_LANGUAGE_KEY = 'Accept-Language';
const HEADER_REFERER_KEY = 'referer';
const I18N_COOKIE_NAME = 'i18n';
const IGNORE_PATHS = ['/_next'];

export function nextLanguage(req: NextRequest): string {
  let lng: string | null | undefined;

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

  return lng;
}

export function hasLng(req: NextRequest) {
  return languages.some(lng => req.nextUrl.pathname.startsWith(`/${lng}`));
}

export function hasIgnore(req: NextRequest) {
  return IGNORE_PATHS.some(path => req.nextUrl.pathname.startsWith(path));
}

export function validatePath(req: NextRequest) {
  return hasLng(req) || hasIgnore(req);
}

export function upgradeI18nCookies(req: NextRequest, res: NextResponse) {
  if (!req.headers.has(HEADER_REFERER_KEY)) {
    return;
  }

  const referer = req.headers.get(HEADER_REFERER_KEY) as string;
  const refererUrl = new URL(referer);
  const lngInReferer = languages.find(lng => refererUrl.pathname.startsWith(`/${lng}`));
  if (!lngInReferer) {
    return;
  }

  res.cookies.set(I18N_COOKIE_NAME, lngInReferer);
}
