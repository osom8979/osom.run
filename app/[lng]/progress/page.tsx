import Link from 'next/link';
import styles from './page.module.scss';
import {type I18nRouterProps} from '@/app/[lng]/params';
import Logo from '@/app/components/Logo';
import useTranslation from '@/app/libs/i18n/server';

export default async function ProgressPage(props: I18nRouterProps) {
  const lng = props.params.lng;
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
          <h1>{t('title')}</h1>
          <h3>{t('subtitle')}</h3>
        </div>

        <p className={styles.detailBox}>{t('detail')}</p>

        <div className={styles.actions}>
          <button className="btn btn-md btn-primary w-36">
            <Link href="#" hrefLang={lng}>
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
