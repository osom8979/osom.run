'use client';

import type {HTMLAttributes, PropsWithChildren} from 'react';

type CopyUrlButtonProps = PropsWithChildren<HTMLAttributes<HTMLButtonElement>>;

export default function CopyUrlButton(props: CopyUrlButtonProps) {
  const {children, ...attrs} = props;
  const handlerClick = async () => {
    await navigator.clipboard.writeText(window.location.href);
  };
  return (
    <button type="button" role="button" onClick={handlerClick} {...attrs}>
      {children}
    </button>
  );
}
