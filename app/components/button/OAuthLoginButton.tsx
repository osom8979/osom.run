'use client';

import {useRouter} from 'next/navigation';
import {Fragment, useEffect, useState} from 'react';
import styles from './OAuthLoginButton.module.scss';
import apiClient from '@/app/api/client';
import {HttpStatusError} from '@/app/exceptions';
import MdiDiscord from '@/app/icons/mdi/MdiDiscord';
import MdiGithub from '@/app/icons/mdi/MdiGithub';
import MdiGoogle from '@/app/icons/mdi/MdiGoogle';
import MdiHelpCircleOutline from '@/app/icons/mdi/MdiHelpCircleOutline';
import SvgSpinners270Ring from '@/app/icons/spinners/SvgSpinners270Ring';
import useTranslation from '@/app/libs/i18n/client';
import {ProviderValues, type Providers} from '@/app/libs/schema/auth';

export const DEFAULT_TOOLTIP_TIMEOUT_MILLISECONDS = 4_000;

interface OAuthLoginSubmitProps {
  provider: Providers;
  lng?: string;
  tooltipTimeout?: number;
}

export default function OAuthLoginButton(props: OAuthLoginSubmitProps) {
  const {t} = useTranslation(props.lng, 'components/button/OAuthLoginButton');
  const [pending, setPending] = useState<undefined | true>();
  const [error, setError] = useState<undefined | string>();
  const [timeoutId, setTimeoutId] = useState<undefined | number>();
  const router = useRouter();
  const isUnknownProvider = !ProviderValues.includes(props.provider);
  const tooltipTimeout = props.tooltipTimeout ?? DEFAULT_TOOLTIP_TIMEOUT_MILLISECONDS;

  useEffect(() => {
    return () => {
      if (typeof timeoutId !== 'undefined') {
        clearTimeout(timeoutId);
      }
    };
  }, [timeoutId]);

  const isDisabled = () => {
    return isUnknownProvider ? true : pending;
  };

  const handleClick = async () => {
    setPending(true);
    setError(undefined);
    if (typeof timeoutId !== 'undefined') {
      clearTimeout(timeoutId);
    }

    try {
      const result = await apiClient.loginOAuth(props.provider);
      router.push(result.url);
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

  const ProviderIcon = ({className}: {className?: string}) => {
    if (props.provider === 'github') {
      return <MdiGithub className={className} />;
    } else if (props.provider === 'google') {
      return <MdiGoogle className={className} />;
    } else if (props.provider === 'discord') {
      return <MdiDiscord className={className} />;
    } else {
      return <MdiHelpCircleOutline className={className} />;
    }
  };

  const getProviderText = () => {
    if (props.provider === 'github') {
      return t('login_github');
    } else if (props.provider === 'google') {
      return t('login_google');
    } else if (props.provider === 'discord') {
      return t('login_discord');
    } else {
      return t('unknown_provider');
    }
  };

  return (
    <div className={styles.oauth} data-tip={error}>
      <button
        role="button"
        onClick={handleClick}
        disabled={isDisabled()}
        aria-disabled={isDisabled()}
        aria-label={getProviderText()}
      >
        {pending ? (
          <SvgSpinners270Ring />
        ) : (
          <Fragment>
            <ProviderIcon />
            <span>{getProviderText()}</span>
          </Fragment>
        )}
      </button>
    </div>
  );
}
