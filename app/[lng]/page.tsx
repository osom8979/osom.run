import {createServerComponentClient} from '@supabase/auth-helpers-nextjs';
import {cookies} from 'next/headers';
import Link from 'next/link';
import React from 'react';
import Header from '@/app/[lng]/_header';
import {type I18nRouterProps} from '@/app/[lng]/params';
import useTranslation from '@/app/lib/i18n/server';

export default async function RootLngPage(props: I18nRouterProps) {
  const lng = props.params.lng;
  const cookieStore = cookies();
  console.debug('--- cookieStore: ', cookieStore.getAll());
  const supabase = createServerComponentClient({cookies: () => cookieStore});
  const {t} = await useTranslation(lng, 'root');
  const user = await supabase.auth.getUser();
  const hasSession = user.error === null;
  console.debug('--- hasSession: ', hasSession);

  return (
    <React.Fragment>
      <Header lng={lng} />

      <main>
        <section className="hero min-h-screen bg-base-200">
          <div className="hero-content text-center">
            <div className="max-w-md">
              <h1 className="text-5xl font-bold">{t('title')}</h1>
              <p className="py-6">{t('abstractor')}</p>
              <Link href={`/${lng}/main`} className="btn btn-primary">
                {t('start')}
              </Link>
            </div>
          </div>
        </section>
      </main>
    </React.Fragment>
  );
}
