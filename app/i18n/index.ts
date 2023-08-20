import {createInstance} from 'i18next';
import resourcesToBackend from 'i18next-resources-to-backend';
import {initReactI18next} from 'react-i18next/initReactI18next';
import {defaultNS, defaultOptions, fallbackLng} from './settings';

function i18nImporter(language: string, namespace: string) {
  return import(`./locales/${language}/${namespace}.json`);
}

async function initI18next(language?: string, namespace?: string) {
  const i18nInstance = createInstance();
  await i18nInstance
    .use(initReactI18next)
    .use(resourcesToBackend(i18nImporter))
    .init(defaultOptions(language, namespace));
  return i18nInstance;
}

export interface TranslationOptions {
  keyPrefix?: string;
}

export async function useTranslation(
  language?: string,
  namespace?: string,
  options: TranslationOptions = {}
) {
  const lng = language ?? fallbackLng;
  const ns = namespace ?? defaultNS;
  const i18nextInstance = await initI18next(lng, ns);
  return {
    t: i18nextInstance.getFixedT(lng, ns, options.keyPrefix),
    i18n: i18nextInstance,
  };
}

export default useTranslation;
