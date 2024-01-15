import Link from 'next/link';
import React from 'react';
import {type I18nRouterProps} from '@/app/[lng]/params';
import Logo from '@/app/components/Logo';
import useTranslation from '@/app/libs/i18n/server';

export default async function LngPage(props: I18nRouterProps) {
  const lng = props.params.lng;
  const {t} = await useTranslation(lng, 'root');

  return (
    <main className="min-h-screen">
      <section className="hero min-h-screen">
        <div className="hero-content text-center">
          <div className="max-w-md">
            <div className="flex justify-center w-full">
              <Logo />
            </div>

            <p className="py-6">{t('abstractor')}</p>

            <Link href={`/${lng}/main`} hrefLang={lng} className="btn btn-primary">
              {t('start')}
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
