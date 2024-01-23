import {createServerComponentClient} from '@supabase/auth-helpers-nextjs';
import {cookies, headers} from 'next/headers';
import Link from 'next/link';
import {redirect} from 'next/navigation';
import {type ReactNode} from 'react';
import styles from './layout.module.scss';
import {type I18nLayoutProps} from '@/app/[lng]/params';
import MdiAccountCircle from '@/app/icons/mdi/MdiAccountCircle';
import MdiAccountOutline from '@/app/icons/mdi/MdiAccountOutline';
import MdiBrushVariant from '@/app/icons/mdi/MdiBrushVariant';
import MdiConnection from '@/app/icons/mdi/MdiConnection';
import useTranslation from '@/app/libs/i18n/server';
import {appPaths} from '@/app/paths';

interface SettingsMenuItem {
  icon: ReactNode;
  text: string;
  href: string;
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

  const pathname = headers().get('x-pathname') ?? '';
  const menuItems = [
    {
      icon: <MdiAccountOutline />,
      text: t('menus.profile'),
      href: `/${lng}${appPaths.settingsProfile}`,
    },
    {
      icon: <MdiBrushVariant />,
      text: t('menus.appearance'),
      href: `/${lng}${appPaths.settingsAppearance}`,
    },
    {
      icon: <MdiConnection />,
      text: t('menus.connection'),
      href: `/${lng}${appPaths.settingsConnection}`,
    },
  ] as Array<SettingsMenuItem>;

  return (
    <div className={styles.settings}>
      <header>
        <div className={styles.headerProfile}>
          <MdiAccountCircle className={styles.headerProfileImage} />
          <div className={styles.headerProfileInfo}>
            <h3>{user.data.user?.user_metadata?.full_name ?? t('nameless')}</h3>
            <p>
              {user.data.user?.email}
              <span className={styles.tier}>{t('tiers.free')}</span>
            </p>
          </div>
        </div>
        <Link className={styles.headerMenu} href={`/${lng}/`} hrefLang={lng}>
          {t('go_main')}
        </Link>
      </header>

      <div className={styles.settingsMain}>
        <nav className={styles.settingsMainNavi}>
          <ul>
            {menuItems.map((menu, index) => {
              return (
                <li key={index} data-tip={menu.text}>
                  <Link
                    href={menu.href}
                    hrefLang={menu.lng ?? lng}
                    data-active={pathname.startsWith(menu.href)}
                  >
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
