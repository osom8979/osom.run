import {type InitOptions} from 'i18next/typescript/options';

export const FALLBACK_NAMESPACE = ['common', 'http-status', 'emoji'];
export const DEFAULT_NAMESPACE = FALLBACK_NAMESPACE;
export const LOAD_NAMESPACES = DEFAULT_NAMESPACE;
export const LANGUAGES = ['en', 'ko'] as const;
export const FALLBACK_LANGUAGE = LANGUAGES[0];
export const USE_LANGUAGE = LANGUAGES[0];
export const I18N_DEBUG = false;

export const HEADER_ACCEPT_LANGUAGE_KEY = 'Accept-Language';
export const HEADER_REFERER_KEY = 'referer';

export const COOKIE_I18N_KEY = 'osom-lng';

export function defaultServerOptions(
  lng: string = USE_LANGUAGE,
  ns: string | readonly string[] = LOAD_NAMESPACES,
  debug: boolean = I18N_DEBUG
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

export function defaultClientOptions(
  lng = USE_LANGUAGE,
  ns: string | readonly string[] = LOAD_NAMESPACES,
  debug = I18N_DEBUG
) {
  const runsOnServerSide = typeof window === 'undefined';
  return {
    ...defaultServerOptions(lng, ns, debug),
    lng: undefined, // let detect the language on client side
    detection: {
      order: ['path', 'htmlTag', 'cookie', 'navigator'],
      lookupCookie: COOKIE_I18N_KEY,
      lookupFromPathIndex: 0,
    },
    preload: runsOnServerSide ? LANGUAGES : [],
  } as InitOptions;
}
