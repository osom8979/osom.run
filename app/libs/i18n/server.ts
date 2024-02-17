import 'server-only';
import {createInstance} from 'i18next';
import {initReactI18next} from 'react-i18next/initReactI18next';
import backendJsonModule from '@/app/libs/i18n/backend';
import {
  DEFAULT_NAMESPACE,
  defaultServerOptions,
  FALLBACK_LANGUAGE,
} from '@/app/libs/i18n/settings';

async function initI18next(language?: string, namespace?: string | readonly string[]) {
  const i18n = createInstance();
  await i18n
    .use(initReactI18next)
    .use(backendJsonModule)
    .init(defaultServerOptions(language, namespace));
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
