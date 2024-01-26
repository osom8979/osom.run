import {createServerComponentClient} from '@supabase/auth-helpers-nextjs';
import {cookies} from 'next/headers';
import {redirect} from 'next/navigation';
import AppearanceForm from './_AppearanceForm';
import type {I18nRouterProps} from '@/app/[lng]/params';
import PreferenceLayout from '@/app/components/layout/PreferenceLayout';
import {getAppearance} from '@/app/libs/auth/metadata';
import useTranslation from '@/app/libs/i18n/server';

export default async function SettingsAppearancePage(props: I18nRouterProps) {
  const lng = props.params.lng;
  const {t} = await useTranslation(lng, 'settings-appearance');
  const cookieStore = cookies();
  const supabase = createServerComponentClient({cookies: () => cookieStore});
  const userResponse = await supabase.auth.getUser();
  const hasSession = userResponse.error === null;
  if (!hasSession) {
    redirect(`/${lng}`);
  }

  const appearance = getAppearance(userResponse.data.user);
  return (
    <section className="pt-4 sm:pt-0 pr-4">
      <header>
        <h2 className="font-medium text-2xl text-base-content">{t('title')}</h2>
      </header>

      <div className="divider my-2" />

      <PreferenceLayout>
        <div>
          <h3>{t('user.title')}</h3>
          <p>{t('user.subtitle')}</p>
        </div>

        <AppearanceForm lng={lng} appearance={appearance} />
      </PreferenceLayout>
    </section>
  );
}
