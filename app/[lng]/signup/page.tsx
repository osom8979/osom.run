import Link from 'next/link';
import SignupForm from './_SignupForm';
import {type I18nRouterProps} from '@/app/[lng]/params';
import CenterLayout from '@/app/components/layout/CenterLayout';
import useTranslation from '@/app/libs/i18n/server';
import {appPaths} from '@/app/paths';

export default async function SignupPage(props: I18nRouterProps) {
  const lng = props.params.lng;
  const {t} = await useTranslation(lng, 'signup');
  return (
    <CenterLayout lng={lng}>
      <section className="osom-card">
        <div className="card-body items-center space-y-4">
          <div className="card-title">
            <h2>{t('title')}</h2>
          </div>

          <SignupForm lng={lng} buttonLabel={t('signup')} />

          <p>
            <small>
              {t('have_account')}
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
    </CenterLayout>
  );
}
