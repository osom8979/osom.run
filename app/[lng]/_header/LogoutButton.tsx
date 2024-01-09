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

  const handleClick = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    setPending(true);

    const timeout = props.fetchTimeout ?? LOGOUT_API_TIMEOUT_MILLISECONDS;
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeout);

    try {
      const fetchOptions = {method: LOGOUT_API_METHOD, signal: controller.signal};
      await fetch(LOGOUT_API_PATH, fetchOptions);
      router.refresh();
    } catch (e) {
      console.error(String(e));
    } finally {
      setPending(false);
      clearTimeout(timeoutId);
    }
  };

  return (
    <button
      type="submit"
      className={`btn btn-sm btn-secondary btn-outline w-full ${
        pending ? 'btn-disabled' : ''
      }`}
      onClick={handleClick}
      disabled={pending}
      aria-disabled={pending}
    >
      {!pending ? (
        <SvgSpinners270Ring className="fill-current" />
      ) : (
        <span>{props.label}</span>
      )}
    </button>
  );
}
