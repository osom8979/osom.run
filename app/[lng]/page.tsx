'use client';

// import Image from 'next/image';
import OsomUi from 'osom-ui';
import React from 'react';
// import OsomRunSvg from '../../public/osom.run.svg';
import useTranslation from '@/app/i18n';

export default async function RootLngPage({params: {lng}}: {params: {lng: string}}) {
  const {t} = await useTranslation(lng);
  return (
    <main>
      <h1 className="font-sans">{t('title')}</h1>
      {/*<Image src={OsomRunSvg} alt="osom.run" width={112} height={48} />*/}
      <OsomUi.Button />
    </main>
  );
}
