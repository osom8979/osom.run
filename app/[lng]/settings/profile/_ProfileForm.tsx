'use client';

import {useMemo, useState} from 'react';
import apiClient from '@/app/api/client';
import PreferenceForm, {
  type PreferenceField,
} from '@/app/components/form/PreferenceForm';
import type {Profile} from '@/app/libs/auth/metadata';
import useTranslation from '@/app/libs/i18n/client';
import {LANGUAGES} from '@/app/libs/i18n/settings';

interface ProfileFormProps {
  lng: string;
  profile: Profile;
}

export default function ProfileForm(props: ProfileFormProps) {
  const {t} = useTranslation(props.lng, 'settings-profile');
  const [profile, setProfile] = useState(props.profile);
  const fields = useMemo(() => {
    return [
      {
        key: 'nickname',
        type: 'text',
        label: t('basic.nickname.label'),
        detail: t('basic.nickname.detail'),
      },
      {
        key: 'timezone',
        type: 'text',
        label: t('basic.timezone.label'),
        detail: t('basic.timezone.detail'),
      },
      {
        key: 'lng',
        type: 'select',
        label: t('basic.lng.label'),
        detail: t('basic.lng.detail'),
        options: LANGUAGES.map(lng => {
          return {
            value: lng,
            label: t(`language.title.${lng}`),
          };
        }),
      },
    ] as Array<PreferenceField>;
  }, [t]);

  const handleClick = async (value: Record<string, any>) => {
    const modified = value as Profile;
    await apiClient.updateProfile(modified);
    setProfile(modified);
  };

  return (
    <PreferenceForm
      lng={props.lng}
      items={profile}
      fields={fields}
      onClick={handleClick}
      successLabel={t('save_successful')}
      resetLabel={t('reset')}
      saveLabel={t('save')}
    />
  );
}
