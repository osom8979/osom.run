import Link from 'next/link';
import React from 'react';
import Header from '@/app/[lng]/_header/Header';
import {type I18nRouterProps} from '@/app/[lng]/params';
import useTranslation from '@/app/lib/i18n/server';

export default async function LngPage(props: I18nRouterProps) {
  const lng = props.params.lng;
  const {t} = await useTranslation(lng, 'root');

  return (
    <div className="min-h-screen bg-base-200">
      <Header lng={lng} />

      <main>
        <section className="hero">
          <div className="hero-content text-center">
            <div className="max-w-md">
              <h1 className="text-5xl font-bold">{t('title')}</h1>
              <p className="py-6">{t('abstractor')}</p>
              <Link href={`/${lng}/main`} className="btn btn-primary">
                {t('start')}
              </Link>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
