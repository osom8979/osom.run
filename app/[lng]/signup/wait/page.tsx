import Link from 'next/link';
import type {I18nPageProps} from '@/app/[lng]/params';
import CenterLayout from '@/app/components/layout/CenterLayout';
import UilEnvelopeCheck from '@/app/icons/uil/UilEnvelopeCheck';
import useTranslation from '@/app/libs/i18n/server';
import {appPaths} from '@/app/paths';

export default async function SignupWaitPage(props: I18nPageProps) {
  const {lng} = props.params;
  const {t} = await useTranslation(lng, 'signup-wait');

  return (
    <CenterLayout lng={lng}>
      <section className="osom-card">
        <div className="card-body items-center space-y-4">
          <figure>
            <UilEnvelopeCheck className="w-16 h-16" />
          </figure>

          <div className="card-title">
            <h2>{t('title')}</h2>
          </div>

          <p className="text-center">
            {t('details_1')}
            <br />
            {t('details_2')}
          </p>

          <p>
            <small>
              <Link
                href={`/${lng}${appPaths.login}`}
                hrefLang={lng}
                className="link link-primary"
              >
                {t('login_link')}
              </Link>
            </small>
          </p>
        </div>
      </section>
    </CenterLayout>
  );
}
