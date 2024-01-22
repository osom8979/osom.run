import {createServerComponentClient} from '@supabase/auth-helpers-nextjs';
import {cookies} from 'next/headers';
import Link from 'next/link';
import {redirect} from 'next/navigation';
import React, {type ReactNode} from 'react';
import styles from './layout.module.scss';
import {type I18nLayoutProps} from '@/app/[lng]/params';
import MdiAccountCircle from '@/app/icons/mdi/MdiAccountCircle';
import MdiAccountOutline from '@/app/icons/mdi/MdiAccountOutline';
import MdiBrushVariant from '@/app/icons/mdi/MdiBrushVariant';
import MdiConnection from '@/app/icons/mdi/MdiConnection';
import useTranslation from '@/app/libs/i18n/server';

interface SettingsMenuItem {
  icon: ReactNode;
  text: string;
  href?: string;
  lng?: string;
}

export default async function SettingsLayout(props: I18nLayoutProps) {
  const lng = props.params.lng;
  const {t} = await useTranslation(lng, 'settings');
  const cookieStore = cookies();
  const supabase = createServerComponentClient({cookies: () => cookieStore});
  const user = await supabase.auth.getUser();
  const hasSession = user.error === null;
  if (!hasSession) {
    redirect(`/${lng}`);
  }

  const menuItems = [
    {
      icon: <MdiAccountOutline />,
      text: t('profile'),
      href: `/${lng}/settings/profile`,
    },
    {
      icon: <MdiBrushVariant />,
      text: t('appearance'),
      href: `/${lng}/settings/appearance`,
    },
    {
      icon: <MdiConnection />,
      text: t('connection'),
      href: `/${lng}/settings/connection`,
    },
  ] as Array<SettingsMenuItem>;

  return (
    <div className={styles.settings}>
      <header>
        <div className={styles.headerProfile}>
          <MdiAccountCircle className={styles.headerProfileImage} />
          <div className={styles.headerProfileInfo}>
            <h3>
              {user.data.user?.user_metadata?.full_name ?? t('unknown_full_name')}
            </h3>
            <p>
              {user.data.user?.email}
              <span className={styles.tier}>{t('free')}</span>
            </p>
          </div>
        </div>
        <Link className={styles.headerMenu} href={`/${lng}/`} hrefLang={lng}>
          {t('move_main')}
        </Link>
      </header>

      <div className={styles.settingsMain}>
        <nav className={styles.settingsMainNavi}>
          <ul>
            {menuItems.map((menu, index) => {
              return (
                <li key={index} data-tip={menu.text}>
                  <Link href={menu.href ?? '#'} hrefLang={menu.lng ?? lng}>
                    {menu.icon}
                    <span>{menu.text}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className={styles.settingsMainContent}>{props.children}</div>
      </div>
    </div>
  );
}
