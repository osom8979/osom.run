import PkceErrorReason from './_PkceErrorReason';
import type {I18nRouterProps} from '@/app/[lng]/params';
import CenterDialog from '@/app/components/CenterDialog';
import GoBackButton from '@/app/components/GoBackButton';
import MdiBarcodeOff from '@/app/icons/mdi/MdiBarcodeOff';
import useTranslation from '@/app/libs/i18n/server';

export default async function LoginPkceErrorPage(props: I18nRouterProps) {
  const lng = props.params.lng;
  const {t} = await useTranslation(lng, 'login-pkce-error');
  return (
    <CenterDialog lng={lng}>
      <div className="osom-card">
        <div className="card-body items-center text-center">
          <figure>
            <MdiBarcodeOff className="w-28 h-28" />
          </figure>

          <h2 className="card-title my-2">{t('title')}</h2>

          <p className="text-wrap">
            <PkceErrorReason lng={lng} />
          </p>

          <div className="card-actions mt-6">
            <GoBackButton className="btn btn-primary">
              <span>{t('back')}</span>
            </GoBackButton>
          </div>
        </div>
      </div>
    </CenterDialog>
  );
}
