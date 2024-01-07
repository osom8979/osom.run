'use client';

import {StatusCodes} from 'http-status-codes';
import Link from 'next/link';
import {useRouter} from 'next/navigation';
import React, {useState} from 'react';
import {BadRequestError, HttpStatusError, UnauthorizedError} from '@/app/exceptions';
import MdiLogin from '@/app/icon/mdi/MdiLogin';
import SvgSpinners270Ring from '@/app/icon/spinners/SvgSpinners270Ring';

const LOGIN_API_PATH = '/api/auth/login';
const LOGIN_API_METHOD = 'POST';
const LOGIN_API_TIMEOUT_MILLISECONDS = 30_000;

interface LoginSubmitProps {
  lng?: string;
  emailLabel?: string;
  emailPlaceholder?: string;
  passwordLabel?: string;
  passwordPlaceholder?: string;
  forgotPasswordLabel?: string;
  loginLabel?: string;
  errorBadRequestLabel?: string;
  errorUnauthorizedLabel?: string;
  fetchTimeout?: number;
}

export default function LoginForm(props: LoginSubmitProps) {
  const emailInit = '';
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState(emailInit);
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
          case StatusCodes.UNAUTHORIZED:
            throw new UnauthorizedError();
          default:
            throw new HttpStatusError(response.status);
        }
      });

      router.push(`/${props.lng}/main`);
    } catch (e) {
      setPending(false);

      if (e instanceof BadRequestError) {
        setError(props.errorBadRequestLabel ?? e.message);
      } else if (e instanceof UnauthorizedError) {
        setError(props.errorUnauthorizedLabel ?? e.message);
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
    <form className="space-y-5" onSubmit={e => handleSubmit(e)}>
      <div className="space-y-4">
        <div className="space-y-2">
          <label htmlFor="email" className="block text-sm">
            {props.emailLabel}
          </label>
          <input
            type="email"
            name="email"
            id="email"
            placeholder={props.emailPlaceholder}
            className={inputClassName}
            value={email}
            onChange={e => setEmail(e.target.value)}
            disabled={pending}
            aria-disabled={pending}
          />
        </div>

        <div className="space-y-2">
          <div className="flex justify-between">
            <label htmlFor="password" className="text-sm">
              {props.passwordLabel}
            </label>
            <Link
              rel="noopener noreferrer"
              href="#"
              className="link link-primary text-xs"
            >
              {props.forgotPasswordLabel}
            </Link>
          </div>

          <input
            type="password"
            name="password"
            id="password"
            placeholder={props.passwordPlaceholder}
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
        {pending ? (
          <SvgSpinners270Ring className="w-6 h-6 fill-current" />
        ) : (
          <MdiLogin className="w-6 h-6 fill-current" />
        )}
        <span>{props.loginLabel}</span>
      </button>
    </form>
  );
}
