import Link from 'next/link';
import styles from './page.module.scss';
import {type I18nPageProps} from '@/app/[lng]/params';
import Logo from '@/app/components/Logo';
import useTranslation from '@/app/libs/i18n/server';
import {appPaths} from '@/app/paths';

export default async function ProgressPage(props: I18nPageProps) {
  const {lng} = props.params;
  const {t} = await useTranslation(lng, 'progress');

  return (
    <section className={styles.root}>
      <div className={styles.centerBox}>
        <div className={styles.logoBox}>
          <Link href={`/${lng}/`} hrefLang={lng}>
            <Logo />
          </Link>
        </div>

        <div className={styles.titleBox}>
          <h2>{t('title')}</h2>
          <h3>{t('subtitle')}</h3>
        </div>

        <p className={styles.detailBox}>{t('detail')}</p>

        <div className={styles.actions}>
          <button className="btn btn-md btn-primary w-36">
            <Link href={`/${lng}${appPaths.progress}/temp`} hrefLang={lng}>
              {t('get_started')}
            </Link>
          </button>

          <button className="btn btn-md btn-primary btn-outline w-36">
            <Link href="#" hrefLang={lng}>
              <p>{t('learn_more')}</p>
            </Link>
          </button>
        </div>
      </div>
    </section>
  );
}
