import ConnectionForm from './_ConnectionForm';
import type {I18nPageProps} from '@/app/[lng]/params';
import {catchMeIfYouCan} from '@/app/[lng]/session';
import PreferenceLayout from '@/app/components/layout/PreferenceLayout';
import useTranslation from '@/app/libs/i18n/server';

export default async function SettingsConnectionPage(props: I18nPageProps) {
  const {supabase, profile} = await catchMeIfYouCan();
  const identities = await supabase.auth.getUserIdentities();
  const {lng} = props.params;
  const {t} = await useTranslation(lng, 'settings-connection');

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
          profile={profile}
          identities={identities.data?.identities}
        />
      </PreferenceLayout>
    </section>
  );
}
