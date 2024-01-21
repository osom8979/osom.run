import Link from 'next/link';
import {type ReactNode} from 'react';
import styles from './CenterDialog.module.scss';
import Logo from '@/app/components/Logo';

interface CenterMainProps {
  children?: ReactNode;
  lng?: string;
  hideLogo?: boolean;
}

export default async function CenterDialog(props: CenterMainProps) {
  const {children, lng, hideLogo} = props;
  return (
    <section className={styles.dialog}>
      <div className={styles.dialogBody}>
        {!hideLogo && (
          <Link href={`/${lng ?? ''}`} hrefLang={lng}>
            <Logo className="h-6" />
          </Link>
        )}

        <div className={styles.dialogBodyContent}>{children}</div>
      </div>
    </section>
  );
}
