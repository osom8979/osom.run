'use client';

import {StatusCodes} from 'http-status-codes';
import Link from 'next/link';
import {useRouter} from 'next/navigation';
import React, {useState} from 'react';
import {BadRequestError, HttpStatusError, UnauthorizedError} from '@/app/exceptions';
import MdiLogin from '@/app/icons/mdi/MdiLogin';
import SolarEyeClosedOutline from '@/app/icons/solar/SolarEyeClosedOutline';
import SolarEyeOutline from '@/app/icons/solar/SolarEyeOutline';
import SvgSpinners270Ring from '@/app/icons/spinners/SvgSpinners270Ring';
import useTranslation from '@/app/libs/i18n/client';
import {LoginSchema} from '@/app/schemas/auth';

const LOGIN_API_PATH = '/api/auth/login';
const LOGIN_API_METHOD = 'POST';
const LOGIN_API_TIMEOUT_MILLISECONDS = 8_000;

interface LoginSubmitProps {
  lng: string;
  fetchTimeout?: number;
}

export default function LoginForm(props: LoginSubmitProps) {
  const {t} = useTranslation(props.lng, 'login');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [pending, setPending] = useState<undefined | boolean>();
  const [error, setError] = useState<undefined | string>();
  const router = useRouter();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const validatedFields = LoginSchema.safeParse({email, password});
    if (!validatedFields.success) {
      const errors = validatedFields.error.errors;
      console.assert(errors.length >= 1);
      setError(errors[0].message);
      return;
    }

    setPending(true);
    const data = new FormData();
    data.set('email', email);
    data.set('password', password);

    const timeout = props.fetchTimeout ?? LOGIN_API_TIMEOUT_MILLISECONDS;
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeout);

    try {
      const fetchOptions = {
        method: LOGIN_API_METHOD,
        signal: controller.signal,
        body: data,
      };

      await fetch(LOGIN_API_PATH, fetchOptions).then(response => {
        switch (response.status) {
          case StatusCodes.OK:
            return;
          case StatusCodes.BAD_REQUEST:
            throw new BadRequestError();
          case StatusCodes.UNAUTHORIZED:
            throw new UnauthorizedError();
          default:
            throw new HttpStatusError(response.status);
        }
      });

      router.push(`/${props.lng}/main`);
    } catch (e) {
      setPending(undefined);

      if (e instanceof BadRequestError) {
        setError(t('bad_request') ?? e.message);
      } else if (e instanceof UnauthorizedError) {
        setError(t('unauthorized') ?? e.message);
      } else if (e instanceof HttpStatusError) {
        setError(e.message);
      } else {
        setError(String(e));
      }
    } finally {
      clearTimeout(timeoutId);
    }
  };

  return (
    <form className="osom-form" onSubmit={handleSubmit}>
      <div className="osom-form-list">
        <div className="osom-form-item">
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
            onChange={e => setEmail(e.target.value)}
            disabled={pending}
            aria-disabled={pending}
            data-error={error}
            aria-errormessage={error}
          />
        </div>

        <div className="osom-form-item">
          <div className="flex justify-between">
            <label htmlFor="password">{t('password')}</label>
            <Link
              href={`/${props.lng}/login/recovery`}
              hrefLang={props.lng}
              rel="noopener noreferrer"
            >
              {t('forgot_password')}
            </Link>
          </div>

          <div className="relative w-full">
            <div className="absolute inset-y-0 right-0 flex items-center px-3">
              <button
                type="button"
                className="btn btn-sm btn-circle btn-ghost"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <SolarEyeOutline width="1.6em" height="1.6em" />
                ) : (
                  <SolarEyeClosedOutline width="1.6em" height="1.6em" />
                )}
              </button>
            </div>

            <input
              type={showPassword ? 'text' : 'password'}
              name="password"
              id="password"
              required={true}
              aria-required={true}
              placeholder={t('password_placeholder')}
              aria-placeholder={t('password_placeholder')}
              value={password}
              onChange={e => setPassword(e.target.value)}
              disabled={pending}
              aria-disabled={pending}
              data-error={error}
              aria-errormessage={error}
            />
          </div>
        </div>
      </div>

      <div className="osom-form-error" data-error={error} aria-errormessage={error}>
        <span>{error}</span>
      </div>

      <button type="submit" disabled={pending} aria-disabled={pending}>
        {pending ? <SvgSpinners270Ring /> : <MdiLogin />}
        <span>{t('login')}</span>
      </button>
    </form>
  );
}
