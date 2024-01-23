'use client';

import {useRouter} from 'next/navigation';
import React, {
  Fragment,
  type HTMLAttributes,
  type PropsWithChildren,
  useEffect,
  useState,
} from 'react';
import {HttpStatusError} from '@/app/exceptions';
import MdiAlertCircleOutline from '@/app/icons/mdi/MdiAlertCircleOutline';
import SvgSpinners270Ring from '@/app/icons/spinners/SvgSpinners270Ring';
import useTranslation from '@/app/libs/i18n/client';

export const DEFAULT_ERROR_TIMEOUT_MILLISECONDS = 4_000;

interface RequestButtonProps
  extends Omit<PropsWithChildren<HTMLAttributes<HTMLDivElement>>, 'onClick'> {
  lng?: string;
  errorTimeout?: number;
  noRefresh?: boolean;
  onClick?: () => Promise<void>;
  spinnerClassName?: string;
  alertClassName?: string;
}

export default function RequestButton(props: RequestButtonProps) {
  const {
    children,
    lng,
    errorTimeout,
    noRefresh,
    onClick,
    spinnerClassName,
    alertClassName,
    className,
    ...attrs
  } = props;
  const {t} = useTranslation(lng, 'http-status');
  const [pending, setPending] = useState<undefined | true>();
  const [error, setError] = useState<undefined | string>();
  const [errorTimeoutId, setErrorTimeoutId] = useState<undefined | number>();
  const router = useRouter();

  useEffect(() => {
    return () => {
      if (typeof errorTimeoutId !== 'undefined') {
        clearTimeout(errorTimeoutId);
      }
    };
  }, [errorTimeoutId]);

  const handleClick = async () => {
    if (pending) {
      return;
    }

    if (typeof errorTimeoutId !== 'undefined') {
      clearTimeout(errorTimeoutId);
      setError(undefined);
      setErrorTimeoutId(undefined);
      return;
    }

    setPending(true);

    try {
      if (onClick) {
        await onClick();
      }
      if (!noRefresh) {
        router.refresh();
      }
    } catch (e) {
      setPending(undefined);

      if (e instanceof HttpStatusError) {
        setError(t(`http_status.${e.code}`, {defaultValue: e.message}));
      } else {
        setError(String(e));
      }

      const timeoutId = setTimeout(() => {
        setError(undefined);
        setErrorTimeoutId(undefined);
      }, errorTimeout ?? DEFAULT_ERROR_TIMEOUT_MILLISECONDS);
      setErrorTimeoutId(timeoutId as unknown as number);
    }
  };

  const ButtonBody = () => {
    if (pending) {
      return <SvgSpinners270Ring className={spinnerClassName ?? 'w-6 h-6'} />;
    }
    if (error) {
      return (
        <Fragment>
          <MdiAlertCircleOutline className={alertClassName ?? 'w-4 h-4'} />;
          <span>{error}</span>
        </Fragment>
      );
    }
    return children;
  };

  const buttonClassName = [
    'btn',
    pending ? 'btn-disabled' : undefined,
    error ? 'btn-error' : undefined,
    className,
  ]
    .filter(v => typeof v !== 'undefined')
    .join(' ');

  return (
    <div
      role="button"
      className={buttonClassName}
      onClick={handleClick}
      data-disabled={pending}
      aria-disabled={pending}
      data-error={error}
      {...attrs}
    >
      <ButtonBody />
    </div>
  );
}
