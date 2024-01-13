import Link from 'next/link';
import React from 'react';
import {type I18nRouterProps} from '@/app/[lng]/params';
import SignupForm from '@/app/[lng]/signup/_components/SignupForm';
import Logo from '@/app/components/Logo';
import useTranslation from '@/app/libs/i18n/server';

export default async function SignupPage(props: I18nRouterProps) {
  const lng = props.params.lng;
  const {t} = await useTranslation(lng, 'signup');
  return (
    <main className="container mx-auto flex flex-col items-center">
      <section className="mx-4 my-16 flex flex-col items-center">
        <Link href={`/${lng}/`} hrefLang={lng} className="my-8">
          <Logo height="1em" />
        </Link>

        <div className="card">
          <h2 className="mt-3 mb-9 text-2xl text-center">{t('subtitle')}</h2>

          <SignupForm lng={lng} />

          <p className="text-sm text-center my-6">
            {t('have_account')}
            <Link
              href={`/${lng}/login`}
              rel="noopener noreferrer"
              className="link link-primary ml-1"
            >
              {t('login_link')}
            </Link>
          </p>
        </div>
      </section>
    </main>
  );
}
