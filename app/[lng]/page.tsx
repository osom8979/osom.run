import Link from 'next/link';
import React from 'react';
import useTranslation from '@/app/lib/i18n/server';
import Logo from '@/app/ui/logo';

export default async function RootLngPage({params: {lng}}: {params: {lng: string}}) {
  const {t} = await useTranslation(lng, 'root');
  return (
    <main>
      <div className="navbar bg-base-100">
        <div className="flex-1">
          <Link href={`/${lng}/`} hrefLang={lng}>
            <Logo />
          </Link>
        </div>
        <div className="flex-none">
          <ul className="menu menu-horizontal px-1">
            <li>
              <a className="font-bold" href={`/${lng}/signin`}>
                {t('signin')}
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="hero min-h-screen bg-base-200">
        <div className="hero-content text-center">
          <div className="max-w-md">
            <h1 className="text-5xl font-bold">{t('title')}</h1>
            <p className="py-6">{t('abstractor')}</p>
            <a href={`/${lng}/main`} className="btn btn-primary">
              {t('start')}
            </a>
          </div>
        </div>
      </div>
    </main>
  );
}
