import {type InitOptions} from 'i18next/typescript/options';

export const fallbackLng = 'en';
export const languages = [fallbackLng, 'ko'];
export const defaultNS = '_default';

export function defaultOptions(lng = fallbackLng, ns = defaultNS, debug = false) {
  return {
    debug,
    supportedLngs: languages,
    fallbackLng,
    lng,
    fallbackNS: defaultNS,
    defaultNS,
    ns,
  } as InitOptions;
}
