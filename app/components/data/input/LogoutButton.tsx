'use client';

import {useRouter} from 'next/navigation';
import React, {useState} from 'react';
import apiClient from '@/app/api/client';
import SvgSpinners270Ring from '@/app/icons/spinners/SvgSpinners270Ring';

interface LogoutSubmitProps {
  label?: string;
  nextHref?: string;
}

export default function LogoutButton(props: LogoutSubmitProps) {
  const [pending, setPending] = useState(false);
  const router = useRouter();

  const handleClick = async () => {
    setPending(true);
    try {
      await apiClient.logout();
      if (props.nextHref) {
        router.push(props.nextHref);
      } else {
        router.refresh();
      }
    } catch (e) {
      setPending(false);
      console.error(String(e)); // TODO: Print error toast UI.
    }
  };

  // Using `<button>` will cause daisyUI's dropdown component to lose focus.
  // Use `<div role="button" tabindex="0">` instead.
  return (
    <div
      tabIndex={0}
      role="button"
      className={`btn btn-sm btn-secondary btn-outline w-full ${
        pending ? 'btn-disabled' : ''
      }`}
      onClick={handleClick}
      aria-disabled={pending}
    >
      {pending ? (
        <SvgSpinners270Ring className="fill-current" />
      ) : (
        <span>{props.label}</span>
      )}
    </div>
  );
}
