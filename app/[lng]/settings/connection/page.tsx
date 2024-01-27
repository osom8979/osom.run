import {createServerComponentClient} from '@supabase/auth-helpers-nextjs';
import {cookies} from 'next/headers';
import {redirect} from 'next/navigation';
import ConnectionForm from './_ConnectionForm';
import type {I18nRouterProps} from '@/app/[lng]/params';
import PreferenceLayout from '@/app/components/layout/PreferenceLayout';
import {getProfile} from '@/app/libs/auth/metadata';
import useTranslation from '@/app/libs/i18n/server';

export default async function SettingsConnectionPage(props: I18nRouterProps) {
  const lng = props.params.lng;
  const {t} = await useTranslation(lng, 'settings-connection');
  const cookieStore = cookies();
  const supabase = createServerComponentClient({cookies: () => cookieStore});
  const userResponse = await supabase.auth.getUser();
  const hasSession = userResponse.error === null;
  if (!hasSession) {
    redirect(`/${lng}`);
  }

  return (
    <section className="pt-4 sm:pt-0 pr-4">
      <header>
        <h2 className="font-medium text-2xl text-base-content">{t('title')}</h2>
      </header>

      <div className="divider my-2" />

      <PreferenceLayout>
        <div>
          <h3>{t('oauth.title')}</h3>
          <p>{t('oauth.subtitle')}</p>
        </div>

        <ConnectionForm
          lng={lng}
          profile={getProfile(userResponse.data.user)}
          identities={userResponse.data.user?.identities}
        />
      </PreferenceLayout>
    </section>
  );
}
