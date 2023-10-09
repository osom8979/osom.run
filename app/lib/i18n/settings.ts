import {type InitOptions} from 'i18next/typescript/options';

export const en = 'en';
export const ko = 'ko';
export const defaultNS = '_default';
export const languages = [en, ko];
export const fallbackLng = en;

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
