import type {I18nPageProps} from '@/app/[lng]/params';
import UpdatePasswordForm from '@/app/[lng]/password/reset/update/_UpdatePasswordForm';
import useTranslation from '@/app/libs/i18n/server';

export default async function PasswordResetUpdatePage(props: I18nPageProps) {
  const {lng} = props.params;
  const {t} = await useTranslation(lng, 'password-reset-update');

  return (
    <div className="osom-center">
      <section className="osom-card">
        <div className="card-body items-center space-y-4">
          <div className="card-title">
            <h2>{t('title')}</h2>
          </div>

          <p>{t('details')}</p>

          <UpdatePasswordForm lng={lng} buttonLabel={t('update')} />
        </div>
      </section>
    </div>
  );
}
