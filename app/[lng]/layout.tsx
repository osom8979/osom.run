import {createServerComponentClient} from '@supabase/auth-helpers-nextjs';
import {Analytics} from '@vercel/analytics/react';
import {SpeedInsights} from '@vercel/speed-insights/next';
import {dir} from 'i18next';
import {cookies} from 'next/headers';
import Link from 'next/link';
import {Toaster} from 'react-hot-toast';
import AnonymousMenu from '@/app/[lng]/_AnonymousMenu';
import MenuButton from '@/app/[lng]/_MenuButton';
import UserMenu from '@/app/[lng]/_UserMenu';
import type {I18nLayoutProps} from '@/app/[lng]/params';
import Logo from '@/app/components/Logo';
import useTranslation from '@/app/libs/i18n/server';
import {LANGUAGES} from '@/app/libs/i18n/settings';
import {getAppearance} from '@/app/libs/supabase/metadata';
import {
  COOKIE_THEME_KEY,
  DARK_THEME_CLASS,
  DARK_THEME_NAME,
  LIGHT_THEME_CLASS,
  LIGHT_THEME_NAME,
} from '@/app/libs/theme/settings';
import {appPaths} from '@/app/paths';

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
    const appearance = getAppearance(user.data.user);
    themeName = appearance.theme;
  } else {
    const themeCookie = cookieStore.get(COOKIE_THEME_KEY);
    themeName = themeCookie?.value ?? '';
  }

  let htmlClassName = '';
  let htmlDataTheme = '';
  if (themeName === 'light') {
    htmlClassName = LIGHT_THEME_CLASS;
    htmlDataTheme = LIGHT_THEME_NAME;
  } else if (themeName === 'dark') {
    htmlClassName = DARK_THEME_CLASS;
    htmlDataTheme = DARK_THEME_NAME;
  }

  return (
    <html
      className={htmlClassName}
      lang={lng}
      dir={dir(lng)}
      data-theme={htmlDataTheme}
    >
      <body className="min-h-screen flex flex-col">
        <header className="navbar sticky top-0 min-h-fit bg-base-200 h-osom-header px-2 z-10">
          <div className="flex-1 flex flex-row justify-between items-center flex-nowrap">
            <div className="flex items-center space-x-2">
              <MenuButton />

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

            <nav className="flex justify-end">
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

        <main className="flex-grow h-0">{props.children}</main>

        <Analytics />
        <SpeedInsights />
        <Toaster position="bottom-center" reverseOrder={false} />
      </body>
    </html>
  );
}
