import {createServerComponentClient} from '@supabase/auth-helpers-nextjs';
import {Analytics} from '@vercel/analytics/react';
import {SpeedInsights} from '@vercel/speed-insights/next';
import {dir} from 'i18next';
import {cookies} from 'next/headers';
import Link from 'next/link';
import {Toaster} from 'react-hot-toast';
import AnonymousMenu from '@/app/[lng]/_AnonymousMenu';
import MainMenu from '@/app/[lng]/_MainMenu';
import UserMenu from '@/app/[lng]/_UserMenu';
import styles from '@/app/[lng]/layout.module.scss';
import type {I18nLayoutProps} from '@/app/[lng]/params';
import Logo from '@/app/components/Logo';
import MaterialSymbolsMenuRounded from '@/app/icons/ms/MaterialSymbolsMenuRounded';
import useTranslation from '@/app/libs/i18n/server';
import {LANGUAGES} from '@/app/libs/i18n/settings';
import {getAppearance} from '@/app/libs/supabase/metadata';
import {THEME_COOKIE_KEY, getThemeInfo} from '@/app/libs/theme/common';

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

  let themeName: string;
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
            <div className={styles.content}>
              {hasSession && (
                <nav className={styles.contentLeft}>
                  <MainMenu lng={lng} user={user.data.user} />
                </nav>
              )}

              <div className={styles.contentRight}>
                <header>
                  <div className={styles.headerLayout}>
                    <div className={styles.headerLeft}>
                      {hasSession && (
                        <div className="flex-none sm:hidden">
                          <label
                            htmlFor={OSOM_MAIN_MENU_BUTTON_ID}
                            aria-label={t('open_drawer')}
                            className="btn btn-sm btn-circle btn-ghost"
                          >
                            <MaterialSymbolsMenuRounded className="w-6 h-6" />
                          </label>
                        </div>
                      )}

                      {!hasSession && (
                        <Link className={styles.logo} href={`/${lng}`} hrefLang={lng}>
                          <Logo />
                        </Link>
                      )}
                    </div>

                    <div className={styles.headerCenter}></div>

                    <div className={styles.headerRight}>
                      {hasSession ? (
                        <UserMenu
                          lng={lng}
                          user={user.data.user}
                          settingsLabel={t('settings')}
                          logoutLabel={t('logout')}
                        />
                      ) : (
                        <AnonymousMenu
                          lng={lng}
                          loginLabel={t('login')}
                          signupLabel={t('signup')}
                        />
                      )}
                    </div>
                  </div>
                </header>

                <main>{props.children}</main>
              </div>
            </div>
          </div>

          {hasSession && (
            <div className="drawer-side z-20">
              <label
                htmlFor={OSOM_MAIN_MENU_BUTTON_ID}
                aria-label={t('close_drawer')}
                className="drawer-overlay"
              ></label>

              <nav className={styles.overlay}>
                <MainMenu lng={lng} user={user.data.user} />
              </nav>
            </div>
          )}
        </div>

        <Analytics />
        <SpeedInsights />
        <Toaster position="bottom-center" reverseOrder={false} />
      </body>
    </html>
  );
}
