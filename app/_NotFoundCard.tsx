'use client';

import React from 'react';
import GoBackButton from '@/app/components/GoBackButton';
import TablerError404 from '@/app/icons/tabler/TablerError404';
import useTranslation from '@/app/libs/i18n/client';

export interface NotFoundCardProps {
  lng?: string;
}

export default function NotFoundCard(props: NotFoundCardProps) {
  const {t} = useTranslation(props.lng, 'not-found');
  return (
    <section className="osom-card">
      <div className="card-body items-center space-y-4">
        <figure>
          <TablerError404 className="w-28 h-28" />
        </figure>

        <div className="card-title">
          <h2>{t('title')}</h2>
        </div>

        <p>{t('details')}</p>

        <div className="card-actions">
          <GoBackButton className="btn btn-primary">
            <span>{t('back')}</span>
          </GoBackButton>
        </div>
      </div>
    </section>
  );
}
