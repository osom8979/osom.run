'use client';

import {useSearchParams, useRouter} from 'next/navigation';
import apiClient from '@/app/api/client';
import EmailPasswordForm from '@/app/components/form/EmailPasswordForm';
import {appPaths} from '@/app/paths';

interface UpdatePasswordFormProps {
  lng: string;
  buttonLabel: string;
}

export default function UpdatePasswordForm(props: UpdatePasswordFormProps) {
  const params = useSearchParams();
  const router = useRouter();
  const code = params.get('code');
  if (!code) {
    router.push(`/${props.lng}${appPaths.loginPkceErrorWithReason('nocode')}`);
    return;
  }

  const handleSubmit = async (email: string, password: string) => {
    console.assert(!email);
    await apiClient.passwordResetUpdate(code, password);
  };

  return (
    <EmailPasswordForm
      lng={props.lng}
      nextHref={`/${props.lng}${appPaths.login}`}
      showPasswordValidation={true}
      hideEmail={true}
      hideLabel={true}
      buttonLabel={props.buttonLabel}
      onSubmit={handleSubmit}
    />
  );
}
