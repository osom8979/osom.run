import type {HTMLAttributes, PropsWithChildren} from 'react';
import styles from '@/app/components/layout/PreferenceLayout.module.scss';

type PreferenceLayoutProps = PropsWithChildren<HTMLAttributes<HTMLDivElement>>;

export default function PreferenceLayout(props: PreferenceLayoutProps) {
  const {children, className, ...attrs} = props;
  const finalClassName = [styles.root, className]
    .filter(v => typeof v !== 'undefined')
    .join(' ');
  return (
    <div className={finalClassName} {...attrs}>
      {children}
    </div>
  );
}
