'use client';

import apiClient from '@/app/api/client';
import EmailPasswordForm from '@/app/components/data/form/EmailPasswordForm';

interface ResetPasswordFormProps {
  lng: string;
  buttonLabel: string;
}

export default function ResetPasswordForm(props: ResetPasswordFormProps) {
  const handleSubmit = async (email: string) => {
    await apiClient.resetPassword(email);
  };

  return (
    <EmailPasswordForm
      lng={props.lng}
      nextHref={`/${props.lng}/reset/password/wait`}
      hidePassword={true}
      hideLabel={true}
      buttonLabel={props.buttonLabel}
      onSubmit={handleSubmit}
    />
  );
}
