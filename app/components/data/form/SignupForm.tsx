'use client';

import apiClient from '@/app/api/client';
import EmailPasswordForm from '@/app/components/data/form/EmailPasswordForm';
import useTranslation from '@/app/libs/i18n/client';

interface SignupFormProps {
  lng: string;
}

export default function SignupForm(props: SignupFormProps) {
  const {t} = useTranslation(props.lng, 'components/data/form/SignupForm');
  const handleSubmit = async (email: string, password: string) => {
    await apiClient.signup(email, password);
  };

  return (
    <EmailPasswordForm
      lng={props.lng}
      nextHref={`/${props.lng}/signup/wait`}
      showPasswordValidation={true}
      buttonLabel={t('submit')}
      onSubmit={handleSubmit}
    />
  );
}
