import {createServerComponentClient} from '@supabase/auth-helpers-nextjs';
import {cookies} from 'next/headers';
import Link from 'next/link';
import {redirect} from 'next/navigation';
import LoginForm from './_LoginForm';
import {type I18nRouterProps} from '@/app/[lng]/params';
import CenterDialog from '@/app/components/CenterDialog';
import OAuthLoginButton from '@/app/components/OAuthLoginButton';
import useTranslation from '@/app/libs/i18n/server';
import {ProviderValues} from '@/app/libs/schema/auth';
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
    <CenterDialog lng={lng}>
      <div className="card bg-base-100 shadow-lg">
        <div className="card-body items-center">
          <h2 className="card-title mb-6 text-center">{t('title')}</h2>

          <div className="my-6 w-full space-y-4">
            {ProviderValues.map(key => {
              return <OAuthLoginButton key={key} provider={key} lng={lng} />;
            })}
          </div>

          <div className="flex items-center w-full my-4">
            <hr className="w-full"></hr>
            <span className="px-3 whitespace-nowrap">{t('or')}</span>
            <hr className="w-full"></hr>
          </div>

          <LoginForm lng={lng} buttonLabel={t('login')} />

          <p className="text-sm text-center my-6">
            {t('no_account')}
            <Link
              href={`/${lng}${appPaths.signup}`}
              hrefLang={lng}
              rel="noopener noreferrer"
              className="link link-primary ml-1"
            >
              {t('signup_link')}
            </Link>
          </p>
        </div>
      </div>
    </CenterDialog>
  );
}
