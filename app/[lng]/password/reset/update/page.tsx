import UpdatePasswordForm from './_UpdatePasswordForm';
import type {I18nRouterProps} from '@/app/[lng]/params';
import CenterDialog from '@/app/components/CenterDialog';
import useTranslation from '@/app/libs/i18n/server';

export default async function PasswordResetUpdatePage(props: I18nRouterProps) {
  const lng = props.params.lng;
  const {t} = await useTranslation(lng, 'password-reset-update');
  return (
    <CenterDialog lng={lng}>
      <div className="osom-card">
        <div className="card-body items-center">
          <h2 className="card-title mt-2 mb-6 text-center">{t('title')}</h2>

          <UpdatePasswordForm lng={lng} buttonLabel={t('update')} />
        </div>
      </div>
    </CenterDialog>
  );
}
