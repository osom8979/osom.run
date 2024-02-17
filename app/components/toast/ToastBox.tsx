'use client';

import type {HTMLAttributes, PropsWithChildren} from 'react';
import {toast as toastOri, type Toast} from 'react-hot-toast';
import styles from '@/app/components/toast/ToastBox.module.scss';

interface ToastBoxProps
  extends Omit<
    PropsWithChildren<HTMLAttributes<HTMLDivElement>>,
    'className' | 'onClick'
  > {
  toast: Toast;
  className?: string;
}

export default function ToastBox(props: ToastBoxProps) {
  const {toast, className, children, ...attrs} = props;
  const finalClassName = [styles.root, className]
    .filter(v => typeof v !== 'undefined')
    .join(' ');

  return (
    <div
      className={finalClassName}
      onClick={() => toastOri.dismiss(toast.id)}
      data-visible={toast.visible}
      {...attrs}
    >
      {children}
    </div>
  );
}
