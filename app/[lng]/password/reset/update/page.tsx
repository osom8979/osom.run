import UpdatePasswordForm from './_UpdatePasswordForm';
import type {I18nPageProps} from '@/app/[lng]/params';
import CenterLayout from '@/app/components/layout/CenterLayout';
import useTranslation from '@/app/libs/i18n/server';

export default async function PasswordResetUpdatePage(props: I18nPageProps) {
  const lng = props.params.lng;
  const {t} = await useTranslation(lng, 'password-reset-update');
  return (
    <CenterLayout lng={lng}>
      <section className="osom-card">
        <div className="card-body items-center space-y-4">
          <div className="card-title">
            <h2>{t('title')}</h2>
          </div>

          <p>{t('details')}</p>

          <UpdatePasswordForm lng={lng} buttonLabel={t('update')} />
        </div>
      </section>
    </CenterLayout>
  );
}
