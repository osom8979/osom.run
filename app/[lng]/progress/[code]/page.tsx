import Link from 'next/link';
import {type I18nPageProps} from '@/app/[lng]/params';
import CenterLayout from '@/app/components/layout/CenterLayout';
import SvgSpinners3DotsFade from '@/app/icons/spinners/SvgSpinners3DotsFade';
import useTranslation from '@/app/libs/i18n/server';
import {appPaths} from '@/app/paths';

export default async function ProgressPage(props: I18nPageProps) {
  const lng = props.params.lng;
  const {t} = await useTranslation(lng, 'progress');
  const progress = 50;

  return (
    <CenterLayout lng={lng}>
      <section className="osom-card bg-base-200/30">
        <div className="card-body items-center space-y-4">
          <div className="card-title text-center">
            <h2>{t('title')}</h2>
          </div>

          <div className="card-title">
            <h2 className="font-extrabold text-8xl tracking-tighter">
              {progress}
              <span className="text-3xl">%</span>
            </h2>
          </div>

          <div className="w-full">
            <progress
              className="progress progress-primary w-full"
              value={progress}
              max="100"
            ></progress>
          </div>

          <p className="flex flex-row items-center text-center animate-pulse">
            <span>{t('progressing')}</span>
            <span className="ml-1 self-end">
              <SvgSpinners3DotsFade />
            </span>
          </p>

          <div className="card-actions gap-4">
            <button className="btn btn-md btn-primary w-full sm:w-36">
              <Link href={`/${lng}${appPaths.progress}/temp`} hrefLang={lng}>
                {t('complete')}
              </Link>
            </button>

            <button className="btn btn-md btn-error btn-outline w-full sm:w-36">
              <Link href="#" hrefLang={lng}>
                <p>{t('abort')}</p>
              </Link>
            </button>
          </div>
        </div>
      </section>
    </CenterLayout>
  );
}
