import {createInstance} from 'i18next';
import resourcesToBackend from 'i18next-resources-to-backend';
import {initReactI18next} from 'react-i18next/initReactI18next';
import {DEFAULT_NAMESPACE, defaultOptions, FALLBACK_LANGUAGE} from './settings';

function backendI18nImporter(language: string, namespace: string) {
  return import(`./locales/${language}/${namespace}.json`);
}

async function initI18next(language?: string, namespace?: string) {
  const i18n = createInstance();
  await i18n
    .use(initReactI18next)
    .use(resourcesToBackend(backendI18nImporter))
    .init(defaultOptions(language, namespace));
  return i18n;
}

export interface TranslationOptions {
  keyPrefix?: string;
}

export async function useTranslation(
  language?: string,
  namespace?: string,
  options: TranslationOptions = {}
) {
  const lng = language ?? FALLBACK_LANGUAGE;
  const ns = namespace ?? DEFAULT_NAMESPACE;
  const i18nextInstance = await initI18next(lng, ns);
  return {
    t: i18nextInstance.getFixedT(lng, ns, options.keyPrefix),
    i18n: i18nextInstance,
  };
}

export default useTranslation;
