import Link from 'next/link';
import type {HTMLAttributes, PropsWithChildren} from 'react';
import styles from './CenterLayout.module.scss';
import Logo from '@/app/components/Logo';

interface CenterDialogProps
  extends Omit<PropsWithChildren<HTMLAttributes<HTMLDivElement>>, 'className'> {
  lng?: string;
  showLogo?: boolean;
  logoClassName?: string;
  logoHref?: string;
}

export default async function CenterLayout(props: CenterDialogProps) {
  const {children, lng, showLogo, logoClassName, logoHref, ...attrs} = props;
  const finalLinkHref = logoHref ?? `/${lng ?? ''}`;
  return (
    <div className={styles.root} {...attrs}>
      <div className={styles.body}>
        {showLogo && (
          <Link href={finalLinkHref} hrefLang={lng}>
            <Logo className={logoClassName ?? 'w-36'} />
          </Link>
        )}

        <div className={styles.content}>{children}</div>
      </div>
    </div>
  );
}
