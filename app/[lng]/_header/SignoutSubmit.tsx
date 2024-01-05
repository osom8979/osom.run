'use client';

import React from 'react';
import {useFormStatus} from 'react-dom';

interface SignoutSubmitProps {
  label?: string;
}

export default function SignoutSubmit(props: SignoutSubmitProps) {
  const {pending} = useFormStatus();
  return (
    <button
      type="submit"
      className="btn btn-sm btn-secondary btn-outline w-full"
      aria-disabled={pending}
    >
      <span>{props.label}</span>
    </button>
  );
}
