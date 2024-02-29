import {createServerComponentClient} from '@supabase/auth-helpers-nextjs';
import {cookies} from 'next/headers';
import React from 'react';
import NotFoundCard from '@/app/_NotFoundCard';
import CenterLayout from '@/app/components/layout/CenterLayout';
import {findThemeInfo} from '@/app/theme';

export default async function RootNotFound() {
  const cookieStore = cookies();
  const supabase = createServerComponentClient({cookies: () => cookieStore});
  const userResponse = await supabase.auth.getUser();
  const theme = findThemeInfo(userResponse);

  return (
    <html className={theme.className} data-theme={theme.dataTheme}>
      <body className="min-h-screen flex flex-col">
        <main className="flex-grow h-0">
          <CenterLayout showLogo={true}>
            <NotFoundCard />
          </CenterLayout>
        </main>
      </body>
    </html>
  );
}
