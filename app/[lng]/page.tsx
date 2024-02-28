import Link from 'next/link';
import styles from '@/app/[lng]/page.module.scss';
import type {I18nPageProps} from '@/app/[lng]/params';
import Logo from '@/app/components/Logo';
import useTranslation from '@/app/libs/i18n/server';
import {appPaths} from '@/app/paths';

export default async function LngPage(props: I18nPageProps) {
  const {lng} = props.params;
  const {t} = await useTranslation(lng, 'root');

  return (
    <section className={styles.root}>
      <div className={styles.centerBox}>
        <div className={styles.logoBox}>
          <Link href={`/${lng}`} hrefLang={lng}>
            <Logo />
          </Link>
        </div>

        <div className={styles.titleBox}>
          <h2>{t('title')}</h2>
        </div>

        <p className={styles.detailBox}>{t('abstractor')}</p>

        <div className={styles.dividerLine} />

        <div className={styles.dividerLine} />

        <div className={styles.actions}>
          <Link
            href={`/${lng}${appPaths.login}`}
            hrefLang={lng}
            className="btn btn-md btn-primary"
          >
            {t('login_now')}
          </Link>
        </div>
      </div>
    </section>
  );
}
