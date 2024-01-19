'use client';

import apiClient from '@/app/api/client';
import EmailPasswordForm from '@/app/components/data/form/EmailPasswordForm';
import useTranslation from '@/app/libs/i18n/client';

interface LoginFormProps {
  lng: string;
}

export default function LoginForm(props: LoginFormProps) {
  const {t} = useTranslation(props.lng, 'components/data/form/LoginForm');
  const handleSubmit = async (email: string, password: string) => {
    await apiClient.login(email, password);
  };

  return (
    <EmailPasswordForm
      lng={props.lng}
      nextHref={`/${props.lng}/main`}
      resetPasswordHref={`/${props.lng}/login/reset/password`}
      showResetPassword={true}
      buttonLabel={t('submit')}
      onSubmit={handleSubmit}
    />
  );
}
