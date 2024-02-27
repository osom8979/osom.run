import type {User} from '@supabase/gotrue-js';
import acceptLanguage from 'accept-language';
import type {RequestCookie} from 'next/dist/compiled/@edge-runtime/cookies';
import {NextRequest, NextResponse} from 'next/server';
import {
  COOKIE_I18N_KEY,
  FALLBACK_LANGUAGE,
  HEADER_ACCEPT_LANGUAGE_KEY,
  HEADER_REFERER_KEY,
  LANGUAGES,
} from '@/app/libs/i18n/settings';
import {getRawProfile} from '@/app/libs/supabase/metadata';

acceptLanguage.languages([...LANGUAGES]);

export function hasLng(req: NextRequest) {
  return LANGUAGES.some(lng => req.nextUrl.pathname.startsWith(`/${lng}`));
}

export function invalidLngPathname(req: NextRequest) {
  return !hasLng(req);
}

export interface FindNextLanguageOptions {
  req?: NextRequest;
  user?: User;
  i18nCookieKey?: string;
}

export function findNextLanguage(options?: FindNextLanguageOptions): string {
  let lng: string | null | undefined;

  // Step 01. Authenticated session
  if (!lng && options?.user) {
    const profile = getRawProfile(options.user);
    lng = acceptLanguage.get(profile.lng);
    if (lng) {
      console.debug(`Use session lng: '${lng}'`);
    }
  }

  if (!lng && options?.req) {
    const i18nCookieKey = options.i18nCookieKey ?? COOKIE_I18N_KEY;
    const req = options.req;

    // Step 02. Cookie store
    if (req.cookies.has(i18nCookieKey)) {
      const cookie = req.cookies.get(i18nCookieKey) as RequestCookie;
      lng = acceptLanguage.get(cookie.value);
      if (lng) {
        console.debug(`Use cookie lng: '${lng}'`);
      }
    }

    // Step 03. Accept-Language request header
    if (!lng) {
      const headerValue = req.headers.get(HEADER_ACCEPT_LANGUAGE_KEY);
      lng = acceptLanguage.get(headerValue);
      if (lng) {
        console.debug(`Use accept-language lng: '${lng}'`);
      }
    }
  }

  // Step 04. Fallback language.
  if (!lng) {
    lng = FALLBACK_LANGUAGE;
    if (lng) {
      console.debug(`Use fallback lng: '${lng}'`);
    }
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
