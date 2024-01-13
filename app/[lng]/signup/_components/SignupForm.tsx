'use client';

import {StatusCodes} from 'http-status-codes';
import {useRouter} from 'next/navigation';
import React, {useState} from 'react';
import {BadRequestError, HttpStatusError} from '@/app/exceptions';
import SvgSpinners270Ring from '@/app/icons/spinners/SvgSpinners270Ring';
import useTranslation from '@/app/libs/i18n/client';

const LOGIN_API_PATH = '/api/auth/signup';
const LOGIN_API_METHOD = 'POST';
const LOGIN_API_TIMEOUT_MILLISECONDS = 8_000;

interface SignupSubmitProps {
  lng?: string;
  errorBadRequestLabel?: string;
  fetchTimeout?: number;
}

export default function SignupForm(props: SignupSubmitProps) {
  const {t} = useTranslation(props.lng, 'login');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [pending, setPending] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
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
          default:
            throw new HttpStatusError(response.status);
        }
      });

      router.push(`/${props.lng}/signup/wait`);
    } catch (e) {
      setPending(false);

      if (e instanceof BadRequestError) {
        setError(t('bad_request') ?? e.message);
      } else if (e instanceof HttpStatusError) {
        setError(e.message);
      } else {
        setError(String(e));
      }
    } finally {
      clearTimeout(timeoutId);
    }
  };

  let inputClasses = [
    'input',
    'input-bordered',
    'w-full',
    'placeholder-gray-500',
    'placeholder-opacity-80',
  ];
  if (pending) {
    inputClasses.push('input-disabled');
  }
  if (error) {
    inputClasses.push('input-error');
  }
  const inputClassName = inputClasses.join(' ');

  return (
    <form className="space-y-5" onSubmit={handleSubmit}>
      <div className="space-y-4">
        <div className="space-y-2">
          <label htmlFor="email" className="block text-sm">
            {t('email')}
          </label>
          <input
            type="email"
            name="email"
            id="email"
            placeholder={t('email_placeholder')}
            className={inputClassName}
            value={email}
            onChange={e => setEmail(e.target.value)}
            disabled={pending}
            aria-disabled={pending}
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="password" className="block text-sm">
            {t('password')}
          </label>
          <input
            type="password"
            name="password"
            id="password"
            placeholder={t('password_placeholder')}
            className={inputClassName}
            value={password}
            onChange={e => setPassword(e.target.value)}
            disabled={pending}
            aria-disabled={pending}
          />
        </div>
      </div>

      <div className="pl-2 text-error text-sm">{error && <span>{error}</span>}</div>

      <button
        type="submit"
        className={`btn btn-primary w-full ${pending ? 'btn-disabled' : ''}`}
        disabled={pending}
        aria-disabled={pending}
      >
        {pending && <SvgSpinners270Ring className="w-6 h-6 fill-current" />}
        <span>{t('signup')}</span>
      </button>
    </form>
  );
}
