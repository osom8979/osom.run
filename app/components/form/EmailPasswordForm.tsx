'use client';

import {StatusCodes} from 'http-status-codes';
import Link from 'next/link';
import {useRouter} from 'next/navigation';
import React, {useMemo, useState} from 'react';
import {z} from 'zod';
import styles from './EmailPasswordForm.module.scss';
import {HttpStatusError} from '@/app/exceptions';
import MdiCheckboxBlankCircleOutline from '@/app/icons/mdi/MdiCheckboxBlankCircleOutline';
import MdiCheckboxMarkedCircleOutline from '@/app/icons/mdi/MdiCheckboxMarkedCircleOutline';
import SolarEyeClosedOutline from '@/app/icons/solar/SolarEyeClosedOutline';
import SolarEyeOutline from '@/app/icons/solar/SolarEyeOutline';
import SvgSpinners270Ring from '@/app/icons/spinners/SvgSpinners270Ring';
import useTranslation from '@/app/libs/i18n/client';
import {
  AT_LEAST_ONE_DIGIT,
  AT_LEAST_ONE_LOWERCASE,
  AT_LEAST_ONE_SYMBOL,
  AT_LEAST_ONE_UPPERCASE,
  MAXIMUM_PASSWORD_LENGTH,
  MINIMUM_PASSWORD_LENGTH,
  EmailSchema,
  PasswordSchema,
} from '@/app/libs/schema/auth';

// eslint-disable-next-line no-unused-vars
type OnAsyncSubmit = (email: string, password: string) => Promise<void>;

interface EmailPasswordFormProps {
  lng: string;
  nextHref: string;
  noRefresh?: boolean;
  resetPasswordHref?: string;
  showPasswordValidation?: boolean;
  showResetPassword?: boolean;
  hideEmail?: boolean;
  hidePassword?: boolean;
  hideLabel?: boolean;
  emailAutoFocus?: boolean;
  buttonLabel?: string;
  onSubmit?: OnAsyncSubmit;
}

interface PasswordValidationItem {
  error: boolean;
  message: string;
}

export default function EmailPasswordForm(props: EmailPasswordFormProps) {
  const {t} = useTranslation(props.lng, 'email-password-form');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [pending, setPending] = useState<undefined | true>();
  const [emailError, setEmailError] = useState<undefined | string>();
  const [passwordError, setPasswordError] = useState<undefined | string>();
  const [error, setError] = useState<undefined | string>();
  const router = useRouter();

  const getResetPasswordHref = () => {
    return (props.resetPasswordHref || '/') + (email ? `&email=${email}` : '');
  };

  const isDisabledSubmit = () => {
    if (!props.hideEmail) {
      if (!email || !!emailError) {
        return true;
      }
    }
    if (!props.hidePassword) {
      if (!password || !!passwordError) {
        return true;
      }
    }
    return pending;
  };

  const passwordValidations = useMemo(() => {
    return [
      {
        error: password.length < MINIMUM_PASSWORD_LENGTH,
        message: t('validations.password.too_small', {min: MINIMUM_PASSWORD_LENGTH}),
      },
      {
        error: MAXIMUM_PASSWORD_LENGTH < password.length,
        message: t('validations.password.too_big', {max: MAXIMUM_PASSWORD_LENGTH}),
      },
      {
        error: !password.match(AT_LEAST_ONE_LOWERCASE),
        message: t('validations.password.no_lower'),
      },
      {
        error: !password.match(AT_LEAST_ONE_UPPERCASE),
        message: t('validations.password.no_upper'),
      },
      {
        error: !password.match(AT_LEAST_ONE_DIGIT),
        message: t('validations.password.no_digit'),
      },
      {
        error: !password.match(AT_LEAST_ONE_SYMBOL),
        message: t('validations.password.no_symbol'),
      },
    ] as Array<PasswordValidationItem>;
  }, [t, password]);

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

    const parseResult = PasswordSchema.safeParse(value);
    if (parseResult.success) {
      setPasswordError(undefined);
      return true;
    }

    const errors = parseResult.error.errors;
    if (errors.find(i => i.code === z.ZodIssueCode.too_small)) {
      setPasswordError(t('errors.too_small_password', {min: MINIMUM_PASSWORD_LENGTH}));
    } else if (errors.find(i => i.code === z.ZodIssueCode.too_big)) {
      setPasswordError(t('errors.too_big_password', {max: MAXIMUM_PASSWORD_LENGTH}));
    } else {
      setPasswordError(t('errors.invalid_password'));
    }
    return false;
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setPending(true);

    try {
      if (props.onSubmit) {
        await props.onSubmit(email, password);
      }
      if (props.nextHref) {
        router.push(props.nextHref);
      }
      if (!props.noRefresh) {
        router.refresh();
      }
    } catch (e) {
      setPending(undefined);

      if (e instanceof HttpStatusError) {
        if (e.code === StatusCodes.BAD_REQUEST) {
          setError(t(`errors.bad_request`));
        } else if (e.code === StatusCodes.UNAUTHORIZED) {
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
    <form className={styles.form} noValidate={true} onSubmit={handleSubmit}>
      <div className={styles.list}>
        <div
          className={styles.item}
          hidden={props.hideEmail}
          aria-hidden={props.hideEmail}
        >
          <label htmlFor="email" hidden={props.hideLabel} aria-hidden={props.hideLabel}>
            {t('email')}
          </label>
          <input
            type="email"
            name="email"
            id="email"
            autoFocus={props.emailAutoFocus}
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
            className={styles.error}
            data-error={emailError}
            aria-errormessage={emailError}
          >
            {emailError}
          </p>
        </div>

        <div
          className={styles.item}
          hidden={props.hidePassword}
          aria-hidden={props.hidePassword}
        >
          <div className="flex justify-between">
            <label
              htmlFor="password"
              hidden={props.hideLabel}
              aria-hidden={props.hideLabel}
            >
              {t('password')}
            </label>
            <Link
              href={getResetPasswordHref()}
              hrefLang={props.lng}
              hidden={!props.showResetPassword}
              aria-hidden={!props.showResetPassword}
            >
              {t('forgot_password')}
            </Link>
          </div>

          <div className="relative">
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

            <div className="absolute inset-y-0 z-[1] right-0 flex items-center px-3">
              <button
                type="button"
                role="button"
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

          {props.showPasswordValidation ? (
            <ul
              className={styles.validation}
              hidden={!props.showPasswordValidation}
              aria-hidden={!props.showPasswordValidation}
            >
              {passwordValidations.map((v, i) => {
                return (
                  <li key={i} data-error={v.error}>
                    {v.error ? (
                      <MdiCheckboxBlankCircleOutline />
                    ) : (
                      <MdiCheckboxMarkedCircleOutline />
                    )}
                    <small>{v.message}</small>
                  </li>
                );
              })}
            </ul>
          ) : (
            <p
              className={styles.error}
              data-error={passwordError}
              aria-errormessage={passwordError}
            >
              {passwordError}
            </p>
          )}
        </div>
      </div>

      <p className={styles.error} data-error={error} aria-errormessage={error}>
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
          <span>{props.buttonLabel ?? t('submit')}</span>
        )}
      </button>
    </form>
  );
}
