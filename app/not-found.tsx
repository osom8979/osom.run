import {createServerComponentClient} from '@supabase/auth-helpers-nextjs';
import {cookies} from 'next/headers';
import React from 'react';
import GoBackButton from '@/app/components/button/GoBackButton';
import TablerError404 from '@/app/icons/tabler/TablerError404';
import useTranslation from '@/app/libs/i18n/server';
import {findThemeInfo} from '@/app/theme';

export default async function RootNotFound() {
  const cookieStore = cookies();
  const supabase = createServerComponentClient({cookies: () => cookieStore});
  const userResponse = await supabase.auth.getUser();
  const theme = findThemeInfo(userResponse);
  const {t} = await useTranslation(undefined, 'not-found');

  return (
    <html className={theme.className} data-theme={theme.dataTheme}>
      <body className="daisy-viewport">
        <main className="daisy-center">
          <section className="flex flex-col justify-center">
            <figure className="w-full flex justify-center">
              <TablerError404 className="w-28 h-28" />
            </figure>

            <h3>{t('title')}</h3>

            <GoBackButton className="mt-6">
              <span>{t('back')}</span>
            </GoBackButton>
          </section>
        </main>
      </body>
    </html>
  );
}
