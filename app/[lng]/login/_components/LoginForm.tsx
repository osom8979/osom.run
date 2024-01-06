'use client';

import Link from 'next/link';
import {useRouter} from 'next/navigation';
import React, {useState} from 'react';
import {LoginResult} from '@/app/api/auth/login/route';
import MdiLogin from '@/app/icon/mdi/MdiLogin';
import SvgSpinners270Ring from '@/app/icon/spinners/SvgSpinners270Ring';

interface LoginSubmitProps {
  lng?: string;
  emailLabel?: string;
  passwordLabel?: string;
  forgotPasswordLabel?: string;
  loginLabel?: string;
  fetchTimeoutMilliseconds?: number;
}

export default function LoginForm(props: LoginSubmitProps) {
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [pending, setPending] = useState(false);
  const router = useRouter();

  const controller = new AbortController();
  const signal = controller.signal;

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setPending(true);

    const timeoutMilliseconds = props.fetchTimeoutMilliseconds ?? 30_000;
    const timeout = setTimeout(() => controller.abort(), timeoutMilliseconds);

    try {
      const method = 'POST';
      const body = new FormData();
      body.set('email', email);
      body.set('password', password);
      const response = await fetch('/api/auth/login', {method, signal, body});
      const jsonRaw = await response.json();
      const result = jsonRaw as LoginResult;
      if (result.error) {
        // TODO ...
      } else {
        router.push(`/${props.lng}/main`);
      }
    } finally {
      clearTimeout(timeout);
      setPending(false);
    }
  };

  return (
    <form className="space-y-8" onSubmit={e => handleSubmit(e)}>
      <div className="space-y-4">
        <div className="space-y-2">
          <label htmlFor="email" className="block text-sm">
            {props.emailLabel}
          </label>
          <input
            type="email"
            name="email"
            id="email"
            placeholder="your@email.com"
            className={`input input-bordered w-full ${pending ? 'input-disabled' : ''}`}
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
            placeholder="*****"
            className={`input input-bordered w-full ${pending ? 'input-disabled' : ''}`}
            value={password}
            onChange={e => setPassword(e.target.value)}
            disabled={pending}
            aria-disabled={pending}
          />
        </div>
      </div>

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
