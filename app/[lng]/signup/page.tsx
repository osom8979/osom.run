import Link from 'next/link';
import React from 'react';
import {type I18nRouterProps} from '@/app/[lng]/params';
import SignupForm from '@/app/components/data/form/SignupForm';
import CenterMain from '@/app/components/layout/CenterMain';
import useTranslation from '@/app/libs/i18n/server';

export default async function SignupPage(props: I18nRouterProps) {
  const lng = props.params.lng;
  const {t} = await useTranslation(lng, 'signup');
  return (
    <CenterMain lng={lng}>
      <div className="card bg-base-100 shadow-lg">
        <div className="card-body items-center">
          <h2 className="card-title mb-6 text-center">{t('title')}</h2>

          <SignupForm lng={lng} />

          <p className="text-sm text-center my-6">
            {t('have_account')}
            <Link
              href={`/${lng}/login`}
              hrefLang={lng}
              rel="noopener noreferrer"
              className="link link-primary ml-1"
            >
              {t('login_link')}
            </Link>
          </p>
        </div>
      </div>
    </CenterMain>
  );
}
