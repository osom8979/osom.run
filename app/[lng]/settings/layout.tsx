import Link from 'next/link';
import {type I18nLayoutProps} from '@/app/[lng]/params';
import {catchMeIfYouCan} from '@/app/[lng]/session';
import SettingsMenu from '@/app/[lng]/settings/_SettingsMenu';
import styles from '@/app/[lng]/settings/layout.module.scss';
import MdiAccountCircle from '@/app/icons/mdi/MdiAccountCircle';
import useTranslation from '@/app/libs/i18n/server';

export default async function SettingsLayout(props: I18nLayoutProps) {
  const {user} = await catchMeIfYouCan();
  const {lng} = props.params;
  const {t} = await useTranslation(lng, 'settings');

  return (
    <div className={styles.root}>
      <header className={styles.header}>
        <div className={styles.headerProfile}>
          <MdiAccountCircle />

          <div className={styles.profileInfo}>
            <h2>{user?.user_metadata?.full_name ?? t('nameless')}</h2>
            <p>
              {user?.email}
              <span className={styles.tier}>{t('tiers.free')}</span>
            </p>
          </div>
        </div>

        <Link className={styles.headerLink} href={`/${lng}/`} hrefLang={lng}>
          {t('go_main')}
        </Link>
      </header>

      <div className={styles.main}>
        <nav className={styles.navi}>
          <SettingsMenu lng={lng} />
        </nav>

        <div className={styles.content}>{props.children}</div>
      </div>
    </div>
  );
}
