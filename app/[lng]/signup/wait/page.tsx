import Link from 'next/link';
import React from 'react';
import type {I18nRouterProps} from '@/app/[lng]/params';
import CenterDialog from '@/app/components/layout/CenterDialog';
import UilEnvelopeCheck from '@/app/icons/uil/UilEnvelopeCheck';
import useTranslation from '@/app/libs/i18n/server';

export default async function WaitPage(props: I18nRouterProps) {
  const lng = props.params.lng;
  const {t} = await useTranslation(lng, 'signup-wait');
  return (
    <CenterDialog lng={lng}>
      <div className="card bg-base-100 shadow-lg">
        <div className="card-body items-center">
          <figure>
            <UilEnvelopeCheck className="w-16 h-16" />
          </figure>

          <h2 className="card-title mt-2 mb-6 text-center">{t('title')}</h2>

          <p className="text-center">
            {t('details_1')}
            <br />
            {t('details_2')}
          </p>

          <div className="card-actions mt-4">
            <p>
              <Link
                href={`/${lng}/login`}
                hrefLang={lng}
                className="link link-primary text-sm"
              >
                {t('login_link')}
              </Link>
            </p>
          </div>
        </div>
      </div>
    </CenterDialog>
  );
}
