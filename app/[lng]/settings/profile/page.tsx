import {type I18nRouterProps} from '@/app/[lng]/params';
import useTranslation from '@/app/libs/i18n/server';

export default async function SettingsProfilePage(props: I18nRouterProps) {
  const lng = props.params.lng;
  const {t} = await useTranslation(lng, 'settings-profile');

  return (
    <section>
      <h2>Public Profile</h2>

      <div className="divider m-0" />

      <div>{t('')}</div>
    </section>
  );
}
