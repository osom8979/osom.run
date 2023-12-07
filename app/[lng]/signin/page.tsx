import {createServerComponentClient} from '@supabase/auth-helpers-nextjs';
import {cookies} from 'next/headers';
import Link from 'next/link';
import {redirect} from 'next/navigation';
import React from 'react';
import {type I18nRouterProps} from '@/app/[lng]/params';
import MdiGithub from '@/app/icon/mdi/MdiGithub';
import MdiGoogle from '@/app/icon/mdi/MdiGoogle';
import MdiLogin from '@/app/icon/mdi/MdiLogin';
import useTranslation from '@/app/lib/i18n/server';
import {FALLBACK_LANGUAGE} from '@/app/lib/i18n/settings';
import Logo from '@/app/ui/logo';

export default async function SigninPage(props: I18nRouterProps) {
  const lng = props.params.lng;
  const cookieStore = cookies();
  const supabase = createServerComponentClient({cookies: () => cookieStore});
  const {t} = await useTranslation(lng, 'signin');
  const user = await supabase.auth.getUser();
  const hasSession = user.error === null;
  if (hasSession) {
    redirect(`/${FALLBACK_LANGUAGE}/main`);
  }

  return (
    <main className="container mx-auto flex flex-col items-center">
      <section className="mx-4 my-16 flex flex-col items-center">
        <Link href={`/${lng}/`} hrefLang={lng} className="my-8">
          <Logo height="1em" />
        </Link>

        <div className="card">
          <h2 className="my-3 text-2xl text-center">{t('signin_subtitle')}</h2>

          <div className="my-6 space-y-4">
            <button
              aria-label={t('signin_google')}
              type="button"
              className="btn w-full"
            >
              <MdiGoogle className="w-6 h-6 fill-current" />
              <span>{t('signin_google')}</span>
            </button>

            <button
              aria-label={t('signin_github')}
              role="button"
              className="btn w-full"
            >
              <MdiGithub className="w-6 h-6 fill-current" />
              <span>{t('signin_github')}</span>
            </button>
          </div>

          <div className="flex items-center w-full my-4">
            <hr className="w-full"></hr>
            <span className="px-3 whitespace-nowrap">{t('or')}</span>
            <hr className="w-full"></hr>
          </div>

          <form
            noValidate={false}
            action="api/auth/signin"
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

              <div className="space-y-2">
                <div className="flex justify-between">
                  <label htmlFor="password" className="text-sm">
                    {t('password')}
                  </label>
                  <Link
                    rel="noopener noreferrer"
                    href="#"
                    className="link link-primary text-xs"
                  >
                    {t('forgot_password')}
                  </Link>
                </div>

                <input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="*****"
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
