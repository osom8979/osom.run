import React from 'react';
import type {I18nRouterProps} from '@/app/[lng]/params';
import UpdatePasswordForm from '@/app/components/data/form/UpdatePasswordForm';
import CenterDialog from '@/app/components/layout/CenterDialog';
import useTranslation from '@/app/libs/i18n/server';

export default async function ResetPasswordUpdatePage(props: I18nRouterProps) {
  const lng = props.params.lng;
  const {t} = await useTranslation(lng, 'update-password');
  return (
    <CenterDialog lng={lng}>
      <div className="card bg-base-100 shadow-lg">
        <div className="card-body items-center">
          <h2 className="card-title mt-2 mb-6 text-center">{t('title')}</h2>

          <UpdatePasswordForm lng={lng} buttonLabel={t('update')} />
        </div>
      </div>
    </CenterDialog>
  );
}
