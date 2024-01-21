'use client';

import {useRouter} from 'next/navigation';
import React, {useEffect, useState} from 'react';
import styles from './LogoutButton.module.scss';
import apiClient from '@/app/api/client';
import {HttpStatusError} from '@/app/exceptions';
import SvgSpinners270Ring from '@/app/icons/spinners/SvgSpinners270Ring';
import useTranslation from '@/app/libs/i18n/client';

export const DEFAULT_TOOLTIP_TIMEOUT_MILLISECONDS = 4_000;

interface LogoutSubmitProps {
  lng?: string;
  label?: string;
  tooltipTimeout?: number;
}

export default function LogoutButton(props: LogoutSubmitProps) {
  const {t} = useTranslation(props.lng);
  const [pending, setPending] = useState<undefined | true>();
  const [error, setError] = useState<undefined | string>();
  const [timeoutId, setTimeoutId] = useState<undefined | number>();
  const router = useRouter();
  const tooltipTimeout = props.tooltipTimeout ?? DEFAULT_TOOLTIP_TIMEOUT_MILLISECONDS;

  useEffect(() => {
    return () => {
      if (typeof timeoutId !== 'undefined') {
        clearTimeout(timeoutId);
      }
    };
  }, [timeoutId]);

  const handleClick = async () => {
    if (pending) {
      return;
    }

    setPending(true);
    setError(undefined);
    if (typeof timeoutId !== 'undefined') {
      clearTimeout(timeoutId);
    }

    try {
      await apiClient.logout();
      router.refresh();
    } catch (e) {
      setPending(undefined);

      if (e instanceof HttpStatusError) {
        setError(t(`http_status.${e.code}`, {defaultValue: e.message}));
      } else {
        setError(String(e));
      }

      const timeoutId = setTimeout(() => {
        setError(undefined);
        setTimeoutId(undefined);
      }, tooltipTimeout);
      setTimeoutId(timeoutId as unknown as number);
    }
  };

  return (
    <div className={styles.login} data-tip={error}>
      <button
        role="button"
        className={styles.loginButton}
        onClick={handleClick}
        data-disabled={pending}
        aria-disabled={pending}
        aria-label={props.label}
      >
        {pending ? <SvgSpinners270Ring /> : <span>{props.label}</span>}
      </button>
    </div>
  );
}
