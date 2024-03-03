import {createServerComponentClient} from '@supabase/auth-helpers-nextjs';
import {Analytics} from '@vercel/analytics/react';
import {SpeedInsights} from '@vercel/speed-insights/next';
import {dir} from 'i18next';
import {cookies} from 'next/headers';
import Link from 'next/link';
import {Fragment} from 'react';
import {Toaster} from 'react-hot-toast';
import MainMenu from '@/app/[lng]/_MainMenu';
import styles from '@/app/[lng]/layout.module.scss';
import type {I18nLayoutProps} from '@/app/[lng]/params';
import Logo from '@/app/components/Logo';
import MdiDotsHorizontal from '@/app/icons/mdi/MdiDotsHorizontal';
import MaterialSymbolsMenuRounded from '@/app/icons/ms/MaterialSymbolsMenuRounded';
import {OSOM_MAIN_MENU_BUTTON_ID} from '@/app/ids';
import useTranslation from '@/app/libs/i18n/server';
import {LANGUAGES} from '@/app/libs/i18n/settings';
import {appPaths} from '@/app/paths';
import {findThemeInfo} from '@/app/theme';

export async function generateStaticParams() {
  return LANGUAGES.map(lng => ({lng}));
}

export default async function LngLayout(props: I18nLayoutProps) {
  const cookieStore = cookies();
  const supabase = createServerComponentClient({cookies: () => cookieStore});
  const userResponse = await supabase.auth.getUser();
  const hasSession = userResponse.error === null;
  const {lng} = props.params;
  const {t} = await useTranslation(lng, '[lng].layout');
  const theme = findThemeInfo(userResponse);

  return (
    <html
      className={theme.className}
      lang={lng}
      dir={dir(lng)}
      data-theme={theme.dataTheme}
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
                <nav className={styles.menuSide}>
                  <MainMenu lng={lng} user={userResponse.data.user} />
                </nav>
              )}

              <div className={styles.contentMain}>
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
                            <MaterialSymbolsMenuRounded />
                          </label>
                        </div>
                      )}

                      {!hasSession && (
                        <div className={styles.logoBox}>
                          <Link href={`/${lng}`} hrefLang={lng}>
                            <Logo />
                          </Link>
                        </div>
                      )}
                    </div>

                    <div className={styles.headerCenter}></div>

                    <div className={styles.headerRight}>
                      {hasSession ? (
                        <Fragment>
                          <button className="btn btn-sm btn-ghost btn-circle">
                            <MdiDotsHorizontal />
                          </button>
                        </Fragment>
                      ) : (
                        <Fragment>
                          <Link
                            className="btn btn-sm btn-ghost"
                            href={`/${lng}${appPaths.login}`}
                            hrefLang={lng}
                          >
                            {t('login')}
                          </Link>
                          <Link
                            className="btn btn-sm btn-neutral"
                            href={`/${lng}${appPaths.signup}`}
                            hrefLang={lng}
                          >
                            {t('signup')}
                          </Link>
                        </Fragment>
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

              <nav className={styles.menuOverlay}>
                <MainMenu lng={lng} user={userResponse.data.user} />
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
