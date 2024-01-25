'use client';

import PreferenceForm, {
  type PreferenceField,
} from '@/app/components/form/PreferenceForm';
import type {Profile} from '@/app/libs/auth/metadata';
import useTranslation from '@/app/libs/i18n/client';

interface ProfileFormProps {
  lng: string;
  profile: Profile;
}

export default function ProfileForm(props: ProfileFormProps) {
  const {t} = useTranslation(props.lng, 'settings-profile');
  const fields = [
    {
      key: 'nickname',
      type: 'text',
      label: t('user.nickname.label'),
      detail: t('user.nickname.detail'),
    },
  ] as Array<PreferenceField>;

  const handleSubmit = async (modified: Record<string, any>) => {
    console.debug('handleSubmit', modified);
    // import apiClient from '@/app/api/client';
    // await apiClient.updateProfile(modified as Profile);
  };

  return (
    <PreferenceForm
      lng={props.lng}
      titleLabel={t('user.title')}
      subtitleLabel={t('user.subtitle')}
      resetLabel={t('reset')}
      saveLabel={t('save')}
      items={props.profile}
      fields={fields}
      onSubmit={handleSubmit}
    />
  );
}
