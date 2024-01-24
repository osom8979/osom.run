import {createServerComponentClient} from '@supabase/auth-helpers-nextjs';
import {cookies} from 'next/headers';
import Link from 'next/link';
import {redirect} from 'next/navigation';
import SettingsMenu from './_SettingsMenu';
import styles from './layout.module.scss';
import {type I18nLayoutProps} from '@/app/[lng]/params';
import MdiAccountCircle from '@/app/icons/mdi/MdiAccountCircle';
import useTranslation from '@/app/libs/i18n/server';

export default async function SettingsLayout(props: I18nLayoutProps) {
  const lng = props.params.lng;
  const {t} = await useTranslation(lng, 'settings');
  const cookieStore = cookies();
  const supabase = createServerComponentClient({cookies: () => cookieStore});
  const user = await supabase.auth.getUser();
  const hasSession = user.error === null;
  if (!hasSession) {
    redirect(`/${lng}`);
  }

  return (
    <div className={styles.root}>
      <header className={styles.header}>
        <div className={styles.headerProfile}>
          <MdiAccountCircle className={styles.headerProfileImage} />
          <div className={styles.headerProfileInfo}>
            <h2>{user.data.user?.user_metadata?.full_name ?? t('nameless')}</h2>
            <p>
              {user.data.user?.email}
              <span className={styles.tier}>{t('tiers.free')}</span>
            </p>
          </div>
        </div>

        <Link className={styles.headerMenu} href={`/${lng}/`} hrefLang={lng}>
          {t('go_main')}
        </Link>
      </header>

      <div className={styles.main}>
        <nav className={styles.mainNavi}>
          <SettingsMenu lng={lng} />
        </nav>

        <div className={styles.mainContent}>{props.children}</div>
      </div>
    </div>
  );
}
