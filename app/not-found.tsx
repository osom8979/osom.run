import Link from 'next/link';
import React from 'react';
import GoBackButton from '@/app/components/GoBackButton';
import Logo from '@/app/components/Logo';
import useTranslation from '@/app/lib/i18n/server';

export default async function NotFound() {
  const {t} = await useTranslation(undefined, 'not-found');
  return (
    <html>
      <body className="bg-base-200 h-screen">
        <main className="m-auto h-full">
          <div className="flex flex-col justify-center items-center h-full space-y-8">
            <figure>
              <Link href="/">
                <Logo height="1.2em" />
              </Link>
            </figure>

            <div className="card bg-base-100 shadow-lg">
              <div className="card-body items-center text-center">
                <h2 className="card-title my-2">{t('title')}</h2>

                <p>{t('details')}</p>

                <div className="card-actions mt-8">
                  <GoBackButton className="btn btn-sm btn-primary rounded">
                    <span>{t('back')}</span>
                  </GoBackButton>
                </div>
              </div>
            </div>
          </div>
        </main>
      </body>
    </html>
  );
}
