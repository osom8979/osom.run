import {type I18nRouterProps} from '@/app/[lng]/params';
import ReasonText from '@/app/components/data/display/ReasonText';
import GoBackButton from '@/app/components/data/input/GoBackButton';
import CenterDialog from '@/app/components/layout/CenterDialog';
import MdiBarcodeOff from '@/app/icons/mdi/MdiBarcodeOff';
import useTranslation from '@/app/libs/i18n/server';

export default async function PkceFailurePage(props: I18nRouterProps) {
  const lng = props.params.lng;
  const {t} = await useTranslation(lng, 'pkce-fail');
  return (
    <CenterDialog lng={lng}>
      <div className="card bg-base-100 shadow-lg">
        <div className="card-body items-center text-center">
          <figure>
            <MdiBarcodeOff className="w-28 h-28" />
          </figure>

          <h2 className="card-title my-2">{t('title')}</h2>

          <p>
            <ReasonText lng={lng} />
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
