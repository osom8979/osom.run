'use client';

import React from 'react';
import GoBackButton from '@/app/components/data/input/GoBackButton';
import TablerError404 from '@/app/icons/tabler/TablerError404';
import useTranslation from '@/app/libs/i18n/client';

export default function NotFound() {
  const {t} = useTranslation(undefined, 'not-found');
  return (
    <div className="card bg-base-100 shadow-lg">
      <div className="card-body items-center text-center">
        <figure>
          <TablerError404 className="w-28 h-28" />
        </figure>

        <h2 className="card-title my-2">{t('title')}</h2>

        <p>{t('details')}</p>

        <div className="card-actions mt-6">
          <GoBackButton className="btn btn-primary">
            <span>{t('back')}</span>
          </GoBackButton>
        </div>
      </div>
    </div>
  );
}
