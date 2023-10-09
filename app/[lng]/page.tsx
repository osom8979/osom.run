'use client';

// import Image from 'next/image';
import OsomUi from 'osom-ui';
import React from 'react';
import useTranslation from '@/app/lib/i18n';

export default async function RootLngPage({params: {lng}}: {params: {lng: string}}) {
  const {t} = await useTranslation(lng);
  return (
    <main>
      <h1 className="font-sans">{t('title')}</h1>
      {/*<Image src={OsomRunSvg} alt="osom.run" width={112} height={48} />*/}
      <OsomUi.Button />
      <OsomUi.OsomRunLogo />
    </main>
  );
}
