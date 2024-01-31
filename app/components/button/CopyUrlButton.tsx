'use client';

import type {HTMLAttributes, PropsWithChildren} from 'react';
import toast from 'react-hot-toast';

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
        toast.success(successLabel);
      }
    } catch (e) {
      if (errorLabel) {
        toast.error(errorLabel);
      }
    }
  };

  return (
    <button type="button" role="button" onClick={handlerClick} {...attrs}>
      {children}
    </button>
  );
}
