'use client';

import i18next from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import Cookies from 'js-cookie';
import {useEffect, useState} from 'react';
import {initReactI18next, useTranslation as useTranslationOrg} from 'react-i18next';
import backendJsonModule from '@/app/libs/i18n/backend';
import {TranslationOptions} from '@/app/libs/i18n/server';
import {defaultClientOptions, COOKIE_I18N_KEY} from '@/app/libs/i18n/settings';

i18next
  .use(initReactI18next)
  .use(LanguageDetector)
  .use(backendJsonModule)
  .init(defaultClientOptions())
  .then(() => {
    console.debug(`i18next initialization successful`);
  })
  .catch(error => {
    console.error(`i18next initialization failed: ${error}`);
  });

export function setI18nCookie(language: string) {
  if (language && Cookies.get(COOKIE_I18N_KEY) !== language) {
    Cookies.set(COOKIE_I18N_KEY, language, {path: '/'});
  }
}

export function useTranslation(
  language?: string,
  namespace?: string,
  options: TranslationOptions = {}
) {
  const runsOnServerSide = typeof window === 'undefined';
  const trans = useTranslationOrg(namespace, options);
  const {i18n} = trans;
  if (runsOnServerSide && language && i18n.resolvedLanguage !== language) {
    (async () => {
      await i18n.changeLanguage(language);
    })();
    return trans;
  }

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [activeLng, setActiveLng] = useState(i18n.resolvedLanguage);

  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    if (activeLng === i18n.resolvedLanguage) {
      return;
    }

    setActiveLng(i18n.resolvedLanguage);
  }, [activeLng, i18n.resolvedLanguage]);

  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    if (!language || i18n.resolvedLanguage === language) {
      return;
    }

    (async () => {
      await i18n.changeLanguage(language);
    })();
  }, [language, i18n]);

  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    if (language) {
      setI18nCookie(language);
    }
  }, [language]);

  return trans;
}

export default useTranslation;
