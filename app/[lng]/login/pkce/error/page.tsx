import PkceErrorReason from '@/app/[lng]/login/pkce/error/_PkceErrorReason';
import type {I18nPageProps} from '@/app/[lng]/params';
import GoBackButton from '@/app/components/button/GoBackButton';
import MdiBarcodeOff from '@/app/icons/mdi/MdiBarcodeOff';
import useTranslation from '@/app/libs/i18n/server';

export default async function LoginPkceErrorPage(props: I18nPageProps) {
  const {lng} = props.params;
  const {t} = await useTranslation(lng, 'login-pkce-error');

  return (
    <div className="daisy-center">
      <section className="daisy-card">
        <div className="card-body items-center space-y-4">
          <figure>
            <MdiBarcodeOff className="w-28 h-28" />
          </figure>

          <div className="card-title">
            <h2>{t('title')}</h2>
          </div>

          <p>
            <PkceErrorReason lng={lng} />
          </p>

          <div className="card-actions">
            <GoBackButton className="btn btn-primary">
              <span>{t('back')}</span>
            </GoBackButton>
          </div>
        </div>
      </section>
    </div>
  );
}
