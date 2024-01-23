'use client';

import apiClient from '@/app/api/client';
import EmailPasswordForm from '@/app/components/EmailPasswordForm';
import {appPaths} from '@/app/paths';

interface ResetPasswordFormProps {
  lng: string;
  buttonLabel: string;
}

export default function ResetPasswordForm(props: ResetPasswordFormProps) {
  const handleSubmit = async (email: string) => {
    await apiClient.passwordResetRequest(email);
  };

  return (
    <EmailPasswordForm
      lng={props.lng}
      nextHref={`/${props.lng}${appPaths.passwordResetRequestWait}`}
      hidePassword={true}
      hideLabel={true}
      buttonLabel={props.buttonLabel}
      onSubmit={handleSubmit}
    />
  );
}
