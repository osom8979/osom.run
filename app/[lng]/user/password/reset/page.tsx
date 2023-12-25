import {createServerComponentClient} from '@supabase/auth-helpers-nextjs';
import {cookies} from 'next/headers';
import Link from 'next/link';
import {redirect} from 'next/navigation';
import React from 'react';
import {type I18nRouterProps} from '@/app/[lng]/params';
import MdiLogin from '@/app/icon/mdi/MdiLogin';
import useTranslation from '@/app/lib/i18n/server';
import Logo from '@/app/ui/logo';

export default async function UserPasswordResetPage(props: I18nRouterProps) {
  const lng = props.params.lng;
  const cookieStore = cookies();
  const supabase = createServerComponentClient({cookies: () => cookieStore});
  const {t} = await useTranslation(lng, 'userPasswordReset');
  const user = await supabase.auth.getUser();
  const hasSession = user.error === null;
  if (hasSession) {
    redirect(`/${lng}/main`);
  }

  return (
    <main className="container mx-auto flex flex-col items-center">
      <section className="mx-4 my-16 flex flex-col items-center">
        <Link href={`/${lng}/`} hrefLang={lng} className="my-8">
          <Logo height="1em" />
        </Link>

        <div className="card">
          <h2 className="my-3 text-2xl text-center">{t('reset_password_subtitle')}</h2>

          <form
            noValidate={false}
            action="/api/auth/signin"
            method="post"
            className="space-y-8"
          >
            <div className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="email" className="block text-sm">
                  {t('email')}
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  placeholder="your@email.com"
                  className="input input-bordered w-full"
                />
              </div>
            </div>

            <button type="submit" className="btn btn-primary w-full">
              <MdiLogin className="w-6 h-6 fill-current" />
              <span>{t('signin')}</span>
            </button>
          </form>

          <p className="text-sm text-center my-6">
            {t('no_account')}
            <Link href="#" rel="noopener noreferrer" className="link link-primary ml-1">
              {t('signup_link')}
            </Link>
          </p>
        </div>
      </section>
    </main>
  );
}
