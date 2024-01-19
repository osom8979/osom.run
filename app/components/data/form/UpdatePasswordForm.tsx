'use client';

import {redirect, useSearchParams} from 'next/navigation';
import apiClient from '@/app/api/client';
import EmailPasswordForm from '@/app/components/data/form/EmailPasswordForm';

interface UpdatePasswordFormProps {
  lng: string;
  buttonLabel: string;
}

export default function UpdatePasswordForm(props: UpdatePasswordFormProps) {
  const params = useSearchParams();
  const code = params.get('code');
  if (!code) {
    redirect(`/${props.lng}/pkce/fail?reason=nocode`);
  }

  const handleSubmit = async (email: string, password: string) => {
    console.assert(!email);
    await apiClient.updatePassword(code, password);
  };

  return (
    <EmailPasswordForm
      lng={props.lng}
      nextHref={`/${props.lng}/login`}
      showPasswordValidation={true}
      hideEmail={true}
      hideLabel={true}
      buttonLabel={props.buttonLabel}
      onSubmit={handleSubmit}
    />
  );
}
