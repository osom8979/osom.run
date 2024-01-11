import {createServerComponentClient} from '@supabase/auth-helpers-nextjs';
import {cookies} from 'next/headers';
import Link from 'next/link';
import {redirect} from 'next/navigation';
import React from 'react';
import LoginForm from '@/app/[lng]/login/_components/LoginForm';
import {type I18nRouterProps} from '@/app/[lng]/params';
import Logo from '@/app/components/logo';
import MdiGithub from '@/app/icon/mdi/MdiGithub';
import MdiGoogle from '@/app/icon/mdi/MdiGoogle';
import useTranslation from '@/app/lib/i18n/server';

export default async function LoginPage(props: I18nRouterProps) {
  const lng = props.params.lng;
  const cookieStore = cookies();
  const supabase = createServerComponentClient({cookies: () => cookieStore});
  const user = await supabase.auth.getUser();
  const hasSession = user.error === null;
  if (hasSession) {
    redirect(`/${lng}/main`);
  }

  const {t} = await useTranslation(lng, 'login');
  return (
    <main className="container mx-auto flex flex-col items-center">
      <section className="mx-4 my-16 flex flex-col items-center">
        <Link href={`/${lng}/`} hrefLang={lng} className="my-8">
          <Logo height="1em" />
        </Link>

        <div className="card">
          <h2 className="my-3 text-2xl text-center">{t('subtitle')}</h2>

          <div className="my-6 space-y-4">
            <button role="button" className="btn w-full" aria-label={t('login_google')}>
              <MdiGoogle className="w-6 h-6 fill-current" />
              <span>{t('login_google')}</span>
            </button>

            <button role="button" className="btn w-full" aria-label={t('login_github')}>
              <MdiGithub className="w-6 h-6 fill-current" />
              <span>{t('login_github')}</span>
            </button>
          </div>

          <div className="flex items-center w-full my-4">
            <hr className="w-full"></hr>
            <span className="px-3 whitespace-nowrap">{t('or')}</span>
            <hr className="w-full"></hr>
          </div>

          <LoginForm
            lng={lng}
            emailLabel={t('email')}
            emailPlaceholder={t('email_placeholder')}
            passwordLabel={t('password')}
            passwordPlaceholder={t('password_placeholder')}
            forgotPasswordLabel={t('forgot_password')}
            loginLabel={t('login')}
            errorBadRequestLabel={t('bad_request')}
            errorUnauthorizedLabel={t('unauthorized')}
          />

          <p className="text-sm text-center my-6">
            {t('no_account')}
            <Link
              href={`/${lng}/signup`}
              rel="noopener noreferrer"
              className="link link-primary ml-1"
            >
              {t('signup_link')}
            </Link>
          </p>
        </div>
      </section>
    </main>
  );
}
