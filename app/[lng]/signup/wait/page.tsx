import React from 'react';
import type {I18nRouterProps} from '@/app/[lng]/params';
import CenterMain from '@/app/components/layouts/CenterMain';
import MdiEmailCheckOutline from '@/app/icons/mdi/MdiEmailCheckOutline';
import SvgSpinners3DotsFade from '@/app/icons/spinners/SvgSpinners3DotsFade';
import useTranslation from '@/app/libs/i18n/server';

export default async function WaitPage(props: I18nRouterProps) {
  const lng = props.params.lng;
  const {t} = await useTranslation(lng, 'signup-wait');
  return (
    <CenterMain lng={lng}>
      <div className="card bg-base-100 shadow-lg">
        <div className="card-body items-center">
          <figure>
            <MdiEmailCheckOutline width="4em" height="4em" />
          </figure>

          <h2 className="card-title mt-2 mb-6 text-center">{t('title')}</h2>

          <p className="text-center">
            {t('details_1')}
            <br />
            {t('details_2')}
          </p>

          <div className="card-actionsm mt-6">
            <SvgSpinners3DotsFade width="2em" height="2em" />
          </div>
        </div>
      </div>
    </CenterMain>
  );
}
