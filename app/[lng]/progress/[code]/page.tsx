import Link from 'next/link';
import {type ProgressPageProps} from '@/app/[lng]/progress/[code]/params';
import CopyUrlButton from '@/app/components/button/CopyUrlButton';
import ModalButton from '@/app/components/button/ModalButton';
import CenterLayout from '@/app/components/layout/CenterLayout';
import SvgNumber from '@/app/components/SvgNumber';
import SvgSpinners3DotsFade from '@/app/icons/spinners/SvgSpinners3DotsFade';
import TdesignPercent from '@/app/icons/tdesign/TdesignPercent';
import useTranslation from '@/app/libs/i18n/server';

export default async function ProgressPage(props: ProgressPageProps) {
  const {lng} = props.params;
  const {t} = await useTranslation(lng, 'progress');
  const progress = 50;

  return (
    <CenterLayout lng={lng}>
      <section className="osom-card rounded-3xl bg-base-200 bg-gradient-to-b shadow-md shadow-base-content/10">
        <div className="card-body items-center space-y-4">
          <div className="flex flex-col space-y-2">
            <div className="flex justify-center items-end w-full space-x-[-0.8rem]">
              <SvgNumber value={50} />
              <TdesignPercent className="w-7 h-7 mb-2" />
            </div>

            <p className="flex justify-center items-center text-center animate-pulse">
              <span>{t('progressing')}</span>
              <span className="ml-1 self-end">
                <SvgSpinners3DotsFade />
              </span>
            </p>
          </div>

          <div className="w-full">
            <progress
              className="progress h-3 w-full"
              value={progress}
              max="100"
            ></progress>
          </div>

          <div className="card-actions justify-center w-full gap-4">
            <CopyUrlButton
              className="btn btn-sm btn-secondary rounded-3xl w-full sm:w-36"
              successLabel={t('copy_success')}
              errorLabel={t('copy_error')}
            >
              <p>{t('copy')}</p>
            </CopyUrlButton>

            <ModalButton
              className="btn btn-sm btn-error btn-outline w-full sm:w-36"
              title={t('abort_title')}
              detail={t('abort_detail')}
              ok={t('abort_ok')}
            >
              <p>{t('abort')}</p>
            </ModalButton>
          </div>

          <p className="text-center">
            <small>
              {t('more_info')}
              <Link href="#" hrefLang={lng} className="link link-primary ml-1">
                {t('document_link')}
              </Link>
            </small>
          </p>
        </div>
      </section>
    </CenterLayout>
  );
}
