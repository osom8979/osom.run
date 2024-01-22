'use client';

import apiClient from '@/app/api/client';
import EmailPasswordForm from '@/app/components/form/EmailPasswordForm';

interface SignupFormProps {
  lng: string;
  buttonLabel: string;
}

export default function SignupForm(props: SignupFormProps) {
  const handleSubmit = async (email: string, password: string) => {
    await apiClient.signup(email, password);
  };

  return (
    <EmailPasswordForm
      lng={props.lng}
      nextHref={`/${props.lng}/signup/wait`}
      showPasswordValidation={true}
      buttonLabel={props.buttonLabel}
      onSubmit={handleSubmit}
    />
  );
}
