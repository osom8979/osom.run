import Link from 'next/link';
import ResetPasswordForm from './_ResetPasswordForm';
import {type I18nRouterProps} from '@/app/[lng]/params';
import CenterDialog from '@/app/components/CenterDialog';
import MaterialSymbolsLockResetRounded from '@/app/icons/ms/MaterialSymbolsLockResetRounded';
import useTranslation from '@/app/libs/i18n/server';
import {appPaths} from '@/app/paths';

export default async function PasswordResetRequestPage(props: I18nRouterProps) {
  const lng = props.params.lng;
  const {t} = await useTranslation(lng, 'password-reset-request');
  return (
    <CenterDialog lng={lng}>
      <div className="card bg-base-100 shadow-lg">
        <div className="card-body items-center">
          <figure>
            <MaterialSymbolsLockResetRounded className="w-16 h-16" />
          </figure>

          <h2 className="card-title mt-2 text-center">{t('title')}</h2>

          <p className="text-center my-4">
            {t('details_1')}
            <br />
            {t('details_2')}
          </p>

          <ResetPasswordForm lng={lng} buttonLabel={t('send')} />

          <p className="text-sm text-center my-6">
            {t('remember_password')}
            <Link
              href={`/${lng}${appPaths.login}`}
              hrefLang={lng}
              rel="noopener noreferrer"
              className="link link-primary ml-1"
            >
              {t('login_link')}
            </Link>
          </p>
        </div>
      </div>
    </CenterDialog>
  );
}
