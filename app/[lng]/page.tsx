import {createServerComponentClient} from '@supabase/auth-helpers-nextjs';
import {cookies} from 'next/headers';
import Link from 'next/link';
import React from 'react';
import {type I18nRouterProps} from '@/app/[lng]/params';
import useTranslation from '@/app/lib/i18n/server';
import Logo from '@/app/ui/logo';

export default async function RootLngPage(props: I18nRouterProps) {
  const lng = props.params.lng;
  const cookieStore = cookies();
  const supabase = createServerComponentClient({cookies: () => cookieStore});
  const {t} = await useTranslation(lng, 'root');
  const user = await supabase.auth.getUser();
  const hasSession = user.error === null;

  let navbarItems: React.JSX.Element;
  if (hasSession) {
    navbarItems = (
      <React.Fragment>
        <li>
          <span>{user.data.user?.email}</span>
        </li>
      </React.Fragment>
    );
  } else {
    navbarItems = (
      <React.Fragment>
        <li>
          <Link className="font-bold py-0.5" href={`/${lng}/signin`}>
            {t('signin')}
          </Link>
        </li>
      </React.Fragment>
    );
  }

  return (
    <React.Fragment>
      <header className="navbar min-h-fit bg-base-100">
        <div className="flex-1">
          <Link href={`/${lng}/`} hrefLang={lng}>
            <Logo height="1em" />
          </Link>
        </div>

        <nav className="flex-none">
          <ul className="menu menu-horizontal">{navbarItems}</ul>
        </nav>
      </header>

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
