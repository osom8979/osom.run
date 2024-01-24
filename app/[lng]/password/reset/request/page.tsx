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
      <section className="osom-card">
        <div className="card-body items-center space-y-4">
          <figure>
            <MaterialSymbolsLockResetRounded className="w-16 h-16" />
          </figure>

          <div className="card-title">
            <h2>{t('title')}</h2>
          </div>

          <p className="text-center">
            {t('details_1')}
            <br />
            {t('details_2')}
          </p>

          <ResetPasswordForm lng={lng} buttonLabel={t('send')} />

          <p>
            <small>
              {t('remember_password')}
              <Link
                href={`/${lng}${appPaths.login}`}
                hrefLang={lng}
                className="link link-primary ml-1"
              >
                {t('login_link')}
              </Link>
            </small>
          </p>
        </div>
      </section>
    </CenterDialog>
  );
}
