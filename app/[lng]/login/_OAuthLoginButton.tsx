'use client';

import {useRouter} from 'next/navigation';
import {type ReactNode} from 'react';
import apiClient from '@/app/api/client';
import RequestButton from '@/app/components/button/RequestButton';
import {type Providers} from '@/app/libs/zod/auth';

interface OAuthLoginButtonProps {
  children: ReactNode;
  provider: Providers;
  lng: string;
}

export default function OAuthLoginButton(props: OAuthLoginButtonProps) {
  const router = useRouter();
  const handleClick = async () => {
    const {url} = await apiClient.loginOAuth(props.provider);
    router.push(url);
  };
  return (
    <RequestButton
      className="btn w-full"
      spinnerClassName="w-6 h-6"
      lng={props.lng}
      onClick={handleClick}
    >
      {props.children}
    </RequestButton>
  );
}
