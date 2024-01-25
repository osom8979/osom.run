import {createServerComponentClient} from '@supabase/auth-helpers-nextjs';
import {cookies} from 'next/headers';
import {redirect} from 'next/navigation';
import ProfileForm from './_ProfileForm';
import type {I18nRouterProps} from '@/app/[lng]/params';
import type {Database} from '@/app/api/supabase';
import {getSettings} from '@/app/libs/auth/metadata';
import useTranslation from '@/app/libs/i18n/server';

export default async function SettingsProfilePage(props: I18nRouterProps) {
  const lng = props.params.lng;
  const {t} = await useTranslation(lng, 'settings-profile');
  const cookieStore = cookies();
  const supabase = createServerComponentClient<Database>({cookies: () => cookieStore});
  const userResponse = await supabase.auth.getUser();
  const hasSession = userResponse.error === null;
  if (!hasSession) {
    redirect(`/${lng}`);
  }

  const profile = getSettings(userResponse.data.user).profile ?? {};

  return (
    <section className="pt-4 sm:pt-0 pr-4">
      <h2 className="font-medium text-2xl text-base-content">{t('title')}</h2>

      <div className="divider my-2" />

      <ProfileForm lng={lng} profile={profile} />
    </section>
  );
}
