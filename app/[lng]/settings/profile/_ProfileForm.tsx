'use client';

import {DateTime} from 'luxon';
import {useRouter} from 'next/navigation';
import {useEffect, useMemo, useState} from 'react';
import apiClient from '@/app/api/client';
import PreferenceForm, {
  type PreferenceField,
} from '@/app/components/form/PreferenceForm';
import useTranslation, {setI18nCookie} from '@/app/libs/i18n/client';
import {LANGUAGES} from '@/app/libs/i18n/settings';
import type {Profile} from '@/app/libs/supabase/metadata';
import {SupportZones} from '@/app/libs/tz/zone';
import {appPaths} from '@/app/paths';

interface ProfileFormProps {
  lng: string;
  profile: Profile;
}

export default function ProfileForm(props: ProfileFormProps) {
  const {t} = useTranslation(props.lng, 'settings-profile');
  const router = useRouter();
  const [profile, setProfile] = useState(props.profile);

  const timezoneOptions = useMemo(() => {
    return SupportZones.map(tz => {
      const zz = DateTime.local().setZone(tz).toFormat('ZZ');
      return {value: tz, label: tz + ` (${zz})`};
    });
  }, []);

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
        type: 'select',
        label: t('basic.timezone.label'),
        detail: t('basic.timezone.detail'),
        options: timezoneOptions,
      },
      {
        key: 'lng',
        type: 'select',
        label: t('basic.lng.label'),
        detail: t('basic.lng.detail'),
        options: LANGUAGES.map(lng => {
          return {value: lng, label: t(`language.title.${lng}`)};
        }),
      },
    ] as Array<PreferenceField>;
  }, [t, timezoneOptions]);

  useEffect(() => {
    LANGUAGES.map(lng => {
      router.prefetch(`/${lng}${appPaths.settingsProfile}`);
    });
  }, [router]);

  const handleClick = async (value: Record<string, any>) => {
    const modified = value as Profile;
    await apiClient.updateProfile(modified);
    const updatedNickname = profile.nickname !== modified.nickname;
    const updatedLng = profile.lng !== modified.lng;

    // [IMPORTANT] ---------------------
    // Don't change your code placement!
    setProfile(modified);
    // ---------------------------------

    if (updatedLng) {
      setI18nCookie(modified.lng);

      // The page needs to be updated.
      router.push(`/${modified.lng}${appPaths.settingsProfile}`);
      return;
    }

    if (updatedNickname) {
      // The page needs to be updated.
      router.refresh();
      return;
    }
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
