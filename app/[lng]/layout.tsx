import {createServerComponentClient} from '@supabase/auth-helpers-nextjs';
import {Analytics} from '@vercel/analytics/react';
import {SpeedInsights} from '@vercel/speed-insights/next';
import {dir} from 'i18next';
import {cookies} from 'next/headers';
import Link from 'next/link';
import {Toaster} from 'react-hot-toast';
import AnonymousMenu from '@/app/[lng]/_AnonymousMenu';
import UserMenu from '@/app/[lng]/_UserMenu';
import styles from '@/app/[lng]/layout.module.scss';
import type {I18nLayoutProps} from '@/app/[lng]/params';
import Logo from '@/app/components/Logo';
import MaterialSymbolsMenuRounded from '@/app/icons/ms/MaterialSymbolsMenuRounded';
import useTranslation from '@/app/libs/i18n/server';
import {LANGUAGES} from '@/app/libs/i18n/settings';
import {getAppearance} from '@/app/libs/supabase/metadata';
import {THEME_COOKIE_KEY, getThemeInfo} from '@/app/libs/theme/common';
import {appPaths} from '@/app/paths';
import SettingsMenu from '@/app/[lng]/settings/_SettingsMenu';

const OSOM_MAIN_MENU_BUTTON_ID = 'osom-main-menu-button';

export async function generateStaticParams() {
  return LANGUAGES.map(lng => ({lng}));
}

export default async function LngLayout(props: I18nLayoutProps) {
  const cookieStore = cookies();
  const supabase = createServerComponentClient({cookies: () => cookieStore});
  const user = await supabase.auth.getUser();
  const hasSession = user.error === null;

  const {lng} = props.params;
  const {t} = await useTranslation(lng, 'root-layout');

  let themeName = '';
  if (hasSession) {
    themeName = getAppearance(user.data.user).theme;
  } else {
    const themeCookie = cookieStore.get(THEME_COOKIE_KEY);
    themeName = themeCookie?.value ?? '';
  }

  const themeInfo = getThemeInfo(themeName);

  return (
    <html
      className={themeInfo.className}
      lang={lng}
      dir={dir(lng)}
      data-theme={themeInfo.dataTheme}
    >
      <body className={styles.body}>
        <div className="drawer overflow-hidden">
          <input
            id={OSOM_MAIN_MENU_BUTTON_ID}
            type="checkbox"
            className="drawer-toggle"
          />

          <div className="drawer-content">
            <header className="flex flex-col z-10 w-full h-osom-header px-2 bg-base-200">
              <div className="flex-1 flex flex-row justify-between items-center flex-nowrap">
                <div className="flex items-center space-x-2">
                  <div className="flex-none sm:hidden">
                    <label
                      htmlFor={OSOM_MAIN_MENU_BUTTON_ID}
                      aria-label={t('open_drawer')}
                      className="btn btn-sm btn-circle btn-ghost"
                    >
                      <MaterialSymbolsMenuRounded className="w-6 h-6" />
                    </label>
                  </div>

                  <Link href={`/${lng}/`} hrefLang={lng}>
                    <Logo className="h-4" />
                  </Link>

                  <Link
                    href={`/${lng}${appPaths.progress}`}
                    hrefLang={lng}
                    className="btn btn-sm btn-ghost rounded-lg"
                  >
                    <span>{t('progress')}</span>
                  </Link>
                </div>

                <nav className="flex-none hidden sm:flex sm:justify-end">
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
              </div>
            </header>

            <div className="flex flex-row space-x-6">
              <nav className={styles.side}>
                <SettingsMenu lng={lng} />
              </nav>

              <main className="h-osom-main flex-grow overflow-y-auto">
                {props.children}
              </main>
            </div>
          </div>

          <div className="drawer-side z-20">
            <label
              htmlFor={OSOM_MAIN_MENU_BUTTON_ID}
              aria-label={t('close_drawer')}
              className="drawer-overlay"
            ></label>

            <nav className={styles.overlay}>
              <SettingsMenu lng={lng} />
            </nav>
          </div>
        </div>

        <Analytics />
        <SpeedInsights />
        <Toaster position="bottom-center" reverseOrder={false} />
      </body>
    </html>
  );
}
