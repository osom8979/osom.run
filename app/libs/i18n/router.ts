import 'server-only';
import {cookies} from 'next/headers';
import {useTranslation as useTranslationInServer} from '@/app/libs/i18n/server';
import {COOKIE_I18N_KEY, FALLBACK_LANGUAGE, LANGUAGES} from '@/app/libs/i18n/settings';

export function findLanguage(request: Request, i18nCookie = COOKIE_I18N_KEY): string {
  const cookieStore = cookies();
  const i18n = cookieStore.get(i18nCookie);
  if (typeof i18n !== 'undefined') {
    return i18n.value;
  }

  if (request.referrer) {
    const {pathname} = new URL(request.referrer);
    const lngInReferrer = LANGUAGES.find(lng => pathname.startsWith(`/${lng}`));
    if (lngInReferrer) {
      return lngInReferrer;
    }
  }

  return FALLBACK_LANGUAGE;
}

export async function useTranslation(request: Request, namespace?: string) {
  return await useTranslationInServer(findLanguage(request), namespace);
}

export default useTranslation;
