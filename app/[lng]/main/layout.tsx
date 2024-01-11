import {createServerComponentClient} from '@supabase/auth-helpers-nextjs';
import {cookies} from 'next/headers';
import {redirect} from 'next/navigation';
import React from 'react';
import Header from '@/app/[lng]/_header/Header';
import {type I18nLayoutProps} from '@/app/[lng]/params';

export default async function MainLayout(props: I18nLayoutProps) {
  const lng = props.params.lng;
  const cookieStore = cookies();
  const supabase = createServerComponentClient({cookies: () => cookieStore});
  const user = await supabase.auth.getUser();
  const hasSession = user.error === null;
  if (!hasSession) {
    redirect(`/${lng}/login`);
  }

  return (
    <div className="min-h-screen bg-base-200">
      <Header lng={lng} />

      <main>
        <section className="hero">{props.children}</section>
      </main>
    </div>
  );
}
