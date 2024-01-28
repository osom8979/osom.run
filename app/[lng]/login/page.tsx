import {createServerComponentClient} from '@supabase/auth-helpers-nextjs';
import {cookies} from 'next/headers';
import Link from 'next/link';
import {redirect} from 'next/navigation';
import LoginForm from './_LoginForm';
import OAuthLoginButton from './_OAuthLoginButton';
import {type I18nRouterProps} from '@/app/[lng]/params';
import CenterLayout from '@/app/components/layout/CenterLayout';
import MdiDiscord from '@/app/icons/mdi/MdiDiscord';
import MdiGithub from '@/app/icons/mdi/MdiGithub';
import MdiGoogle from '@/app/icons/mdi/MdiGoogle';
import useTranslation from '@/app/libs/i18n/server';
import {appPaths} from '@/app/paths';

export default async function LoginPage(props: I18nRouterProps) {
  const lng = props.params.lng;
  const cookieStore = cookies();
  const supabase = createServerComponentClient({cookies: () => cookieStore});
  const user = await supabase.auth.getUser();
  const hasSession = user.error === null;
  if (hasSession) {
    redirect(`/${lng}`);
  }

  const {t} = await useTranslation(lng, 'login');
  return (
    <CenterLayout lng={lng}>
      <section className="osom-card">
        <div className="card-body items-center space-y-4">
          <div className="card-title">
            <h2>{t('title')}</h2>
          </div>

          <div className="space-y-4">
            <div
              className="tooltip tooltip-secondary w-full"
              data-tip={t('tooltip.login_google')}
            >
              <OAuthLoginButton provider="google" lng={lng}>
                <MdiGoogle className="w-6 h-6" />
                <span>{t('oauth.login_google')}</span>
              </OAuthLoginButton>
            </div>

            <OAuthLoginButton provider="github" lng={lng}>
              <MdiGithub className="w-6 h-6" />
              <span>{t('oauth.login_github')}</span>
            </OAuthLoginButton>

            <OAuthLoginButton provider="discord" lng={lng}>
              <MdiDiscord className="w-6 h-6" />
              <span>{t('oauth.login_discord')}</span>
            </OAuthLoginButton>
          </div>

          <div className="divider">
            <span>{t('or')}</span>
          </div>

          <LoginForm lng={lng} buttonLabel={t('login')} />

          <p>
            <small>
              {t('no_account')}
              <Link
                href={`/${lng}${appPaths.signup}`}
                hrefLang={lng}
                className="link link-primary ml-1"
              >
                {t('signup_link')}
              </Link>
            </small>
          </p>
        </div>
      </section>
    </CenterLayout>
  );
}
