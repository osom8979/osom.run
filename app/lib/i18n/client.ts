'use client';

import i18next, {type TFunction} from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import resourcesToBackend from 'i18next-resources-to-backend';
import {useEffect, useState} from 'react';
import {useCookies} from 'react-cookie';
import {
  initReactI18next,
  useTranslation as useTranslationOrg,
  type UseTranslationOptions,
} from 'react-i18next';
import {backendI18nImporter} from '@/app/lib/i18n/backend';
import {defaultOptions, LANGUAGES, COOKIE_I18N_KEY} from '@/app/lib/i18n/settings';

const runsOnServerSide = typeof window === 'undefined';

i18next
  .use(initReactI18next)
  .use(LanguageDetector)
  .use(resourcesToBackend(backendI18nImporter))
  .init({
    ...defaultOptions(),
    lng: undefined, // let detect the language on client side
    detection: {
      order: ['path', 'htmlTag', 'cookie', 'navigator'],
    },
    preload: runsOnServerSide ? LANGUAGES : [],
  });

function onChangeLanguageSuccess(trans: TFunction) {
  if (i18next.options.debug) {
    console.debug(`Language change was successful: ${trans}`);
  }
}

function onChangeLanguageFailure(reason: any) {
  if (i18next.options.debug) {
    console.error(`Language change failed: ${reason}`);
  }
}

export function useTranslation(
  lng?: string,
  ns?: string,
  options?: UseTranslationOptions<undefined>
) {
  const translationResponse = useTranslationOrg(ns, options);
  const {i18n} = translationResponse;
  if (runsOnServerSide && lng && i18n.resolvedLanguage !== lng) {
    i18n
      .changeLanguage(lng)
      .then(onChangeLanguageSuccess)
      .catch(onChangeLanguageFailure);
    return translationResponse;
  }

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [activeLng, setActiveLng] = useState(i18n.resolvedLanguage);

  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    if (activeLng !== i18n.resolvedLanguage) {
      setActiveLng(i18n.resolvedLanguage);
    }
  }, [activeLng, i18n.resolvedLanguage]);

  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    if (lng && i18n.resolvedLanguage !== lng) {
      i18n
        .changeLanguage(lng)
        .then(onChangeLanguageSuccess)
        .catch(onChangeLanguageFailure);
    }
  }, [lng, i18n]);

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [cookies, setCookie] = useCookies([COOKIE_I18N_KEY]);

  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    if (cookies.i18n !== lng) {
      setCookie(COOKIE_I18N_KEY, lng, {path: '/'});
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lng, cookies.i18n]);

  return translationResponse;
}
