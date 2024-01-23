import Link from 'next/link';
import type {HTMLAttributes, PropsWithChildren} from 'react';
import styles from './CenterDialog.module.scss';
import Logo from '@/app/components/Logo';

interface CenterDialogProps
  extends Omit<PropsWithChildren<HTMLAttributes<HTMLDivElement>>, 'className'> {
  lng?: string;
  showLogo?: boolean;
  logoClassName?: string;
  logoHref?: string;
}

export default async function CenterDialog(props: CenterDialogProps) {
  const {children, lng, showLogo, logoClassName, logoHref, ...attrs} = props;
  const finalLinkHref = logoHref ?? `/${lng ?? ''}`;
  return (
    <div className={styles.dialog} {...attrs}>
      <div className={styles.dialogBody}>
        {showLogo && (
          <Link href={finalLinkHref} hrefLang={lng}>
            <Logo className={logoClassName ?? 'w-36'} />
          </Link>
        )}

        <div className={styles.dialogBodyContent}>{children}</div>
      </div>
    </div>
  );
}
