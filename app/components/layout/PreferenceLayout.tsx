'use client';

import type {HTMLAttributes, PropsWithChildren, ReactNode} from 'react';
import styles from './PreferenceLayout.module.scss';

interface PreferenceLayoutProps
  extends PropsWithChildren<HTMLAttributes<HTMLDivElement>> {
  leftTitle?: ReactNode;
  leftSubtitle?: ReactNode;
}

export default function PreferenceLayout(props: PreferenceLayoutProps) {
  const {leftTitle, leftSubtitle, children, className, ...attrs} = props;
  const finalClassName = [styles.root, className]
    .filter(v => typeof v !== 'undefined')
    .join(' ');
  return (
    <div className={finalClassName} {...attrs}>
      <div className={styles.left}>
        <div className={styles.title}>{leftTitle}</div>
        <div className={styles.subtitle}>{leftSubtitle}</div>
      </div>
      <div className={styles.right}>{children}</div>
    </div>
  );
}
