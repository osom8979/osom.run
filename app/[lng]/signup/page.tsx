import Link from 'next/link';
import {type I18nPageProps} from '@/app/[lng]/params';
import SignupForm from '@/app/[lng]/signup/_SignupForm';
import useTranslation from '@/app/libs/i18n/server';
import {appPaths} from '@/app/paths';

export default async function SignupPage(props: I18nPageProps) {
  const {lng} = props.params;
  const {t} = await useTranslation(lng, 'signup');

  return (
    <div className="osom-center">
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
    </div>
  );
}
