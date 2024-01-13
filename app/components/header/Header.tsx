import {createServerComponentClient} from '@supabase/auth-helpers-nextjs';
import {cookies} from 'next/headers';
import Link from 'next/link';
import React from 'react';
import styles from './Header.module.scss';
import AnonymousMenu from '@/app/components/header/AnonymousMenu';
import UserMenu from '@/app/components/header/UserMenu';
import Logo from '@/app/components/Logo';
import useTranslation from '@/app/libs/i18n/server';

export default async function Header({lng}: {lng: string}) {
  const cookieStore = cookies();
  const supabase = createServerComponentClient({cookies: () => cookieStore});
  const {t} = await useTranslation(lng, 'header');
  const user = await supabase.auth.getUser();
  const hasSession = user.error === null;

  return (
    <header className={styles.header}>
      <div className="flex-1">
        <Link href={`/${lng}/`} hrefLang={lng}>
          <Logo height="1em" />
        </Link>
      </div>

      <nav>
        {hasSession ? (
          <UserMenu
            lng={lng}
            user={user.data.user}
            settingsLabel={t('settings')}
            logoutLabel={t('logout')}
          />
        ) : (
          <AnonymousMenu lng={lng} loginLabel={t('login')} />
        )}
      </nav>
    </header>
  );
}
