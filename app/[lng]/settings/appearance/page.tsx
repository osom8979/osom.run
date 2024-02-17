import type {I18nPageProps} from '@/app/[lng]/params';
import {catchMeIfYouCan} from '@/app/[lng]/session';
import AppearanceForm from '@/app/[lng]/settings/appearance/_AppearanceForm';
import PreferenceLayout from '@/app/components/layout/PreferenceLayout';
import useTranslation from '@/app/libs/i18n/server';

export default async function SettingsAppearancePage(props: I18nPageProps) {
  const {appearance} = await catchMeIfYouCan();
  const {lng} = props.params;
  const {t} = await useTranslation(lng, 'settings-appearance');

  return (
    <section className="pt-4 sm:pt-0 pr-4">
      <header>
        <h2 className="font-medium text-2xl text-base-content">{t('title')}</h2>
      </header>

      <div className="divider my-2" />

      <PreferenceLayout>
        <div>
          <h3>{t('style.title')}</h3>
          <p>{t('style.subtitle')}</p>
        </div>

        <AppearanceForm lng={lng} appearance={appearance} />
      </PreferenceLayout>
    </section>
  );
}
