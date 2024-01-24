import {createServerComponentClient} from '@supabase/auth-helpers-nextjs';
import {dir} from 'i18next';
import {cookies} from 'next/headers';
import Link from 'next/link';
import AnonymousMenu from './_AnonymousMenu';
import UserMenu from './_UserMenu';
import type {I18nLayoutProps} from '@/app/[lng]/params';
import Logo from '@/app/components/Logo';
import useTranslation from '@/app/libs/i18n/server';
import {LANGUAGES} from '@/app/libs/i18n/settings';

export async function generateStaticParams() {
  return LANGUAGES.map(lng => ({lng}));
}

export default async function LngLayout(props: I18nLayoutProps) {
  const lng = props.params.lng;
  const {t} = await useTranslation(lng, 'header');
  const cookieStore = cookies();
  const supabase = createServerComponentClient({cookies: () => cookieStore});
  const user = await supabase.auth.getUser();
  const hasSession = user.error === null;

  return (
    <html lang={lng} dir={dir(lng)}>
      <body className="min-h-screen flex flex-col">
        <header className="navbar sticky top-0 min-h-fit bg-base-200 h-12 px-2 z-10">
          <div className="flex-1">
            <Link href={`/${lng}/`} hrefLang={lng}>
              <Logo className="h-4" />
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
        </header>

        <main className="flex-grow h-0">{props.children}</main>
      </body>
    </html>
  );
}
