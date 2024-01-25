'use client';

import apiClient from '@/app/api/client';
import EmailPasswordForm from '@/app/components/form/EmailPasswordForm';
import {appPaths} from '@/app/paths';

interface LoginFormProps {
  lng: string;
  buttonLabel: string;
}

export default function LoginForm(props: LoginFormProps) {
  const handleSubmit = async (email: string, password: string) => {
    await apiClient.login(email, password);
  };

  return (
    <EmailPasswordForm
      lng={props.lng}
      nextHref={`/${props.lng}`}
      resetPasswordHref={`/${props.lng}${appPaths.passwordResetRequest}`}
      showResetPassword={true}
      buttonLabel={props.buttonLabel}
      onSubmit={handleSubmit}
    />
  );
}
