import {type InitOptions} from 'i18next/typescript/options';

export const en = 'en';
export const ko = 'ko';

export const DEFAULT_NAMESPACE = '_default';
export const FALLBACK_NAMESPACE = DEFAULT_NAMESPACE;
export const LOAD_NAMESPACES = DEFAULT_NAMESPACE;
export const LANGUAGES = [en, ko];
export const FALLBACK_LANGUAGE = en;
export const USE_LANGUAGE = en;
export const I18N_DEBUG = false;

export const COOKIE_I18N_KEY = 'i18n';
export const IGNORE_REQUEST_PATHS = ['/api', '/_next', 'favicon.ico'];

export function defaultOptions(
  lng = USE_LANGUAGE,
  ns = LOAD_NAMESPACES,
  debug = I18N_DEBUG
) {
  return {
    debug,
    supportedLngs: LANGUAGES,
    fallbackLng: FALLBACK_LANGUAGE,
    lng,
    fallbackNS: FALLBACK_NAMESPACE,
    defaultNS: DEFAULT_NAMESPACE,
    ns,
  } as InitOptions;
}
