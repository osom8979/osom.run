'use client';

import {useRouter} from 'next/navigation';
import React, {useState} from 'react';
import SvgSpinners270Ring from '@/app/icon/spinners/SvgSpinners270Ring';

const LOGOUT_API_PATH = '/api/auth/logout';
const LOGOUT_API_METHOD = 'POST';
const LOGOUT_API_TIMEOUT_MILLISECONDS = 8_000;

interface LogoutSubmitProps {
  label?: string;
  fetchTimeout?: number;
}

export default function LogoutButton(props: LogoutSubmitProps) {
  const [pending, setPending] = useState(false);
  const router = useRouter();

  const handleClick = async () => {
    setPending(true);

    const timeout = props.fetchTimeout ?? LOGOUT_API_TIMEOUT_MILLISECONDS;
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeout);

    try {
      const fetchOptions = {method: LOGOUT_API_METHOD, signal: controller.signal};
      await fetch(LOGOUT_API_PATH, fetchOptions);
      router.refresh();
    } catch (e) {
      setPending(false);
      console.error(String(e)); // TODO: Print error toast UI.
    } finally {
      clearTimeout(timeoutId);
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
