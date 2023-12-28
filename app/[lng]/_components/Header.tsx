import {createServerComponentClient} from '@supabase/auth-helpers-nextjs';
import {cookies} from 'next/headers';
import Link from 'next/link';
import React from 'react';
import AnonymousMenu from '@/app/[lng]/_components/AnonymousMenu';
import UserMenu from '@/app/[lng]/_components/UserMenu';
import Logo from '@/app/components/logo';
import useTranslation from '@/app/lib/i18n/server';

export default async function Header({lng}: {lng: string}) {
  const cookieStore = cookies();
  console.debug('cookieStore: ', cookieStore.getAll());
  const supabase = createServerComponentClient({cookies: () => cookieStore});
  const {t} = await useTranslation(lng, 'header');
  const user = await supabase.auth.getUser();
  const hasSession = user.error === null;
  console.debug('hasSession: ', hasSession);

  return (
    <header className="navbar min-h-fit bg-base-100">
      <div className="flex-1">
        <Link href={`/${lng}/`} hrefLang={lng}>
          <Logo height="1em" />
        </Link>
      </div>

      <nav className="flex justify-end flex-1 px-2">
        <div className="flex items-stretch">
          {hasSession ? (
            <UserMenu
              lng={lng}
              user={user.data.user}
              settingsLabel={t('settings')}
              signOutLabel={t('signout')}
            />
          ) : (
            <AnonymousMenu lng={lng} signInLabel={t('signin')} />
          )}
        </div>
      </nav>
    </header>
  );
}
