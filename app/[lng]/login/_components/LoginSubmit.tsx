'use client';

import React from 'react';
import {useFormStatus} from 'react-dom';
import MdiLogin from '@/app/icon/mdi/MdiLogin';

interface LoginSubmitProps {
  label?: string;
}

export default function LoginSubmit(props: LoginSubmitProps) {
  const {pending} = useFormStatus();
  return (
    <button type="submit" className="btn btn-primary w-full" aria-disabled={pending}>
      <MdiLogin className="w-6 h-6 fill-current" />
      <span>{props.label}</span>
    </button>
  );
}
