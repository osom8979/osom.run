import Link from 'next/link';
import {type ReactNode} from 'react';
import styles from './CenterDialog.module.scss';
import Logo from '@/app/components/Logo';

interface CenterMainProps {
  children?: ReactNode;
  lng?: string;
  showLogo?: boolean;
}

export default async function CenterDialog(props: CenterMainProps) {
  const {children, lng, showLogo} = props;
  return (
    <section className={styles.dialog}>
      <div className={styles.dialogBody}>
        {showLogo && (
          <Link href={`/${lng ?? ''}`} hrefLang={lng}>
            <Logo className="w-36" />
          </Link>
        )}

        <div className={styles.dialogBodyContent}>{children}</div>
      </div>
    </section>
  );
}
