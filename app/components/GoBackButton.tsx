'use client';

import {useRouter} from 'next/navigation';
import type {HTMLAttributes, PropsWithChildren} from 'react';

type GoBackProps = PropsWithChildren<HTMLAttributes<HTMLDivElement>>;

export default function GoBackButton(props: GoBackProps) {
  const router = useRouter();
  const {children, ...attrs} = props;
  const handlerClick = () => {
    router.back();
  };
  return (
    <div role="button" onClick={handlerClick} {...attrs}>
      {children}
    </div>
  );
}
