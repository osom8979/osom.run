import {createServerComponentClient} from '@supabase/auth-helpers-nextjs';
import {cookies} from 'next/headers';
import Link from 'next/link';
import {redirect} from 'next/navigation';
import React from 'react';
import {type I18nRouterProps} from '@/app/[lng]/params';
import EmailPasswordForm from '@/app/components/data/form/EmailPasswordForm';
import CenterDialog from '@/app/components/layout/CenterDialog';
import MdiGithub from '@/app/icons/mdi/MdiGithub';
import MdiGoogle from '@/app/icons/mdi/MdiGoogle';
import useTranslation from '@/app/libs/i18n/server';

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
    <CenterDialog lng={lng}>
      <div className="card bg-base-100 shadow-lg">
        <div className="card-body items-center">
          <h2 className="card-title mb-6 text-center">{t('title')}</h2>

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

          <EmailPasswordForm
            type="login"
            lng={lng}
            href={`/${lng}/main`}
            emailAutoFocus={true}
          />

          <p className="text-sm text-center my-6">
            {t('no_account')}
            <Link
              href={`/${lng}/signup`}
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
