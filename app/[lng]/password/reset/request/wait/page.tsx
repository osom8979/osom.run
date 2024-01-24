import Link from 'next/link';
import type {I18nRouterProps} from '@/app/[lng]/params';
import CenterDialog from '@/app/components/CenterDialog';
import UilEnvelopeCheck from '@/app/icons/uil/UilEnvelopeCheck';
import useTranslation from '@/app/libs/i18n/server';
import {appPaths} from '@/app/paths';

export default async function PasswordResetRequestWaitPage(props: I18nRouterProps) {
  const lng = props.params.lng;
  const {t} = await useTranslation(lng, 'password-reset-request-wait');
  return (
    <CenterDialog lng={lng}>
      <div className="osom-card">
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
                href={`/${lng}${appPaths.login}`}
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
