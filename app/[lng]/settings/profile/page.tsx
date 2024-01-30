import ProfileForm from './_ProfileForm';
import type {I18nPageProps} from '@/app/[lng]/params';
import {catchMeIfYouCan} from '@/app/[lng]/session';
import PreferenceLayout from '@/app/components/layout/PreferenceLayout';
import useTranslation from '@/app/libs/i18n/server';

export default async function SettingsProfilePage(props: I18nPageProps) {
  const {profile} = await catchMeIfYouCan();
  const {lng} = props.params;
  const {t} = await useTranslation(lng, 'settings-profile');

  return (
    <section className="pt-4 sm:pt-0 pr-4">
      <header>
        <h2 className="font-medium text-2xl text-base-content">{t('title')}</h2>
      </header>

      <div className="divider my-2" />

      <PreferenceLayout>
        <div>
          <h3>{t('basic.title')}</h3>
          <p>{t('basic.subtitle')}</p>
        </div>

        <ProfileForm lng={lng} profile={profile} />
      </PreferenceLayout>
    </section>
  );
}
