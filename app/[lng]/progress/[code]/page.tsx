import Link from 'next/link';
import {type I18nRouterProps} from '@/app/[lng]/params';
import Logo from '@/app/components/Logo';
import useTranslation from '@/app/libs/i18n/server';

export default async function ProgressPage(props: I18nRouterProps) {
  const lng = props.params.lng;
  const {t} = await useTranslation(lng, 'progress-runner');

  return (
    <section className="hero h-80">
      <div className="hero-content text-center">
        <div className="max-w-md">
          <div className="flex justify-center w-full">
            <Logo />
          </div>

          <p className="py-6">{t('abstractor')}</p>

          <Link href={`/${lng}`} hrefLang={lng} className="btn btn-primary">
            {t('start')}
          </Link>
        </div>
      </div>
    </section>
  );
}
