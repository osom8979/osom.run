'use client';

import React from 'react';
import {useFormStatus} from 'react-dom';

interface LogoutSubmitProps {
  label?: string;
}

export default function LogoutSubmit(props: LogoutSubmitProps) {
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
