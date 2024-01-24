'use client';

import {useRouter} from 'next/navigation';
import type {HTMLAttributes, PropsWithChildren} from 'react';

type GoBackButtonProps = PropsWithChildren<HTMLAttributes<HTMLButtonElement>>;

export default function GoBackButton(props: GoBackButtonProps) {
  const router = useRouter();
  const {children, ...attrs} = props;
  const handlerClick = () => {
    router.back();
  };
  return (
    <button type="button" role="button" onClick={handlerClick} {...attrs}>
      {children}
    </button>
  );
}
