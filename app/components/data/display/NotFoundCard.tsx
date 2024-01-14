'use client';

import React from 'react';
import GoBackButton from '@/app/components/data/input/GoBackButton';
import useTranslation from '@/app/libs/i18n/client';

export default function NotFound() {
  const {t} = useTranslation(undefined, 'not-found');
  return (
    <div className="card bg-base-100 shadow-lg">
      <div className="card-body items-center text-center">
        <h1 className="font-light text-4xl">404</h1>

        <h2 className="card-title my-2">{t('title')}</h2>

        <p>{t('details')}</p>

        <div className="card-actions mt-6">
          <GoBackButton className="btn btn-sm btn-primary">
            <span>{t('back')}</span>
          </GoBackButton>
        </div>
      </div>
    </div>
  );
}
