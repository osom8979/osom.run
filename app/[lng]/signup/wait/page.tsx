import Link from 'next/link';
import React from 'react';
import type {I18nRouterProps} from '@/app/[lng]/params';
import Logo from '@/app/components/Logo';
import useTranslation from '@/app/libs/i18n/server';

export default async function WaitPage(props: I18nRouterProps) {
  const lng = props.params.lng;
  const {t} = await useTranslation(lng, 'signup-wait');
  return (
    <main className="bg-base-200 h-screen m-auto">
      <div className="flex flex-col justify-center items-center h-full space-y-8">
        <figure>
          <Link href="/">
            <Logo height="1.2em" />
          </Link>
        </figure>

        <div className="card bg-base-100 shadow-lg">
          <div className="card-body items-center text-center">
            <h2 className="card-title my-2">{t('title')}</h2>

            <p>
              {t('details_1')}
              <br />
              {t('details_2')}
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
