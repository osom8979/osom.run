import {type I18nRouterProps} from '@/app/[lng]/params';
import useTranslation from '@/app/libs/i18n/server';

export default async function SettingsAppearancePage(props: I18nRouterProps) {
  const lng = props.params.lng;
  const {t} = await useTranslation(lng, 'settings-appearance');
  return (
    <section>
      <h2>{t('title')}</h2>

      <div className="divider m-0" />
    </section>
  );
}
