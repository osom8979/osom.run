'use client';

import type {HTMLAttributes, PropsWithChildren} from 'react';
import {toastError, toastSuccess} from '@/app/components/toast';

interface CopyUrlButtonProps
  extends PropsWithChildren<HTMLAttributes<HTMLButtonElement>> {
  successLabel?: string;
  errorLabel?: string;
}

export default function CopyUrlButton(props: CopyUrlButtonProps) {
  const {successLabel, errorLabel, children, ...attrs} = props;
  const handlerClick = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);

      if (successLabel) {
        toastSuccess(successLabel);
      }
    } catch (e) {
      console.error(e);
      if (errorLabel) {
        toastError(errorLabel);
      }
    }
  };

  return (
    <button type="button" role="button" onClick={handlerClick} {...attrs}>
      {children}
    </button>
  );
}
