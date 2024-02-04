import Link from 'next/link';
import styles from './page.module.scss';
import {type I18nPageProps} from '@/app/[lng]/params';
import NewProgressButton from '@/app/[lng]/progress/_NewProgressButton';
import Logo from '@/app/components/Logo';
import useTranslation from '@/app/libs/i18n/server';

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
          <NewProgressButton
            lng={lng}
            label={t('new_progress')}
            className="btn btn-md btn-primary w-32 sm:w-48"
          />

          <Link
            href="#"
            hrefLang={lng}
            className="btn btn-md btn-primary btn-outline w-32 sm:w-48"
          >
            <p>{t('learn_more')}</p>
          </Link>
        </div>
      </div>
    </section>
  );
}
