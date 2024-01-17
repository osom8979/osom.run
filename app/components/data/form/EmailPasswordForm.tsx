'use client';

import Link from 'next/link';
import {useRouter} from 'next/navigation';
import React, {useState} from 'react';
import styles from './EmailPasswordForm.module.scss';
import apiClient from '@/app/api/client';
import {HttpStatusError} from '@/app/exceptions';
import SolarEyeClosedOutline from '@/app/icons/solar/SolarEyeClosedOutline';
import SolarEyeOutline from '@/app/icons/solar/SolarEyeOutline';
import SvgSpinners270Ring from '@/app/icons/spinners/SvgSpinners270Ring';
import useTranslation from '@/app/libs/i18n/client';
import {EmailSchema, PasswordSchema} from '@/app/libs/schema/auth';

export type EmailPasswordFormTypes = 'login' | 'signup';

export interface EmailPasswordFormProps {
  type: EmailPasswordFormTypes;
  lng: string;
  href: string;
}

export default function EmailPasswordForm(props: EmailPasswordFormProps) {
  const {t} = useTranslation(props.lng, 'components/data/form/EmailPasswordForm');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [pending, setPending] = useState<undefined | true>();
  const [emailError, setEmailError] = useState<undefined | string>();
  const [passwordError, setPasswordError] = useState<undefined | string>();
  const [error, setError] = useState<undefined | string>();
  const router = useRouter();

  const isSignupType = () => props.type === 'signup';
  const isDisabledSubmit = () => {
    return !email || !!emailError || !password || !!passwordError || pending;
  };

  const handleEmailChange = (value: string) => {
    setEmail(value);

    if (value.length === 0) {
      setEmailError(undefined);
      return false;
    }

    if (EmailSchema.safeParse(value).success) {
      setEmailError(undefined);
      return true;
    }

    setEmailError(t('errors.invalid_email'));
    return false;
  };

  const handlePasswordChange = (value: string) => {
    setPassword(value);

    if (value.length === 0) {
      setPasswordError(undefined);
      return false;
    }

    if (PasswordSchema.safeParse(value).success) {
      setPasswordError(undefined);
      return true;
    }

    setPasswordError(t('errors.invalid_password'));
    return false;
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setPending(true);

    try {
      await apiClient.login(email, password);
      router.push(props.href);
    } catch (e) {
      setPending(undefined);

      if (e instanceof HttpStatusError) {
        if (e.code === 401) {
          setError(t(`errors.unauthorized`));
        } else {
          setError(t(`http_status.${e.code}`, {defaultValue: e.message}));
        }
      } else {
        setError(String(e));
      }
    }
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <div className={styles.formList}>
        <div className={styles.formItem}>
          <label htmlFor="email">{t('email')}</label>
          <input
            type="email"
            name="email"
            id="email"
            required={true}
            aria-required={true}
            placeholder={t('email_placeholder')}
            aria-placeholder={t('email_placeholder')}
            value={email}
            onChange={e => handleEmailChange(e.target.value)}
            disabled={pending}
            aria-disabled={pending}
            data-error={emailError}
            aria-errormessage={emailError}
          />

          <p
            className={styles.formError}
            data-error={emailError}
            aria-errormessage={emailError}
          >
            {emailError}
          </p>
        </div>

        <div className={styles.formItem}>
          <div className="flex justify-between">
            <label htmlFor="password">{t('password')}</label>
            <Link
              href={`/${props.lng}/login/recovery`}
              hrefLang={props.lng}
              rel="noopener noreferrer"
              hidden={isSignupType()}
              aria-hidden={isSignupType()}
            >
              {t('forgot_password')}
            </Link>
          </div>

          <div className="relative w-full">
            <input
              type={showPassword ? 'text' : 'password'}
              name="password"
              id="password"
              required={true}
              aria-required={true}
              placeholder={t('password_placeholder')}
              aria-placeholder={t('password_placeholder')}
              value={password}
              onChange={e => handlePasswordChange(e.target.value)}
              disabled={pending}
              aria-disabled={pending}
              data-error={passwordError}
              aria-errormessage={passwordError}
            />

            <div className="absolute inset-y-0 z-1 right-0 flex items-center px-3">
              <button
                type="button"
                className="btn btn-sm btn-circle btn-ghost"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <SolarEyeOutline className="w-6 h-6" />
                ) : (
                  <SolarEyeClosedOutline className="w-6 h-6" />
                )}
              </button>
            </div>
          </div>

          <p
            className={styles.formError}
            data-error={passwordError}
            aria-errormessage={passwordError}
          >
            {passwordError}
          </p>
        </div>
      </div>

      <p className={styles.formError} data-error={error} aria-errormessage={error}>
        {error}
      </p>

      <button
        type="submit"
        disabled={isDisabledSubmit()}
        aria-disabled={isDisabledSubmit()}
      >
        {pending ? (
          <SvgSpinners270Ring />
        ) : (
          <span>{isSignupType() ? t('signup') : t('login')}</span>
        )}
      </button>
    </form>
  );
}
