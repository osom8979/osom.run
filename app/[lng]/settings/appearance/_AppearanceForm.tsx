'use client';

import {useMemo, useState} from 'react';
import apiClient from '@/app/api/client';
import PreferenceForm, {
  type PreferenceField,
} from '@/app/components/form/PreferenceForm';
import useTranslation from '@/app/libs/i18n/client';
import type {Appearance} from '@/app/libs/supabase/metadata';
import changeTheme from '@/app/libs/theme';
import {ThemeValues} from '@/app/libs/zod/settings';

interface AppearanceFormProps {
  lng: string;
  appearance: Appearance;
}

export default function AppearanceForm(props: AppearanceFormProps) {
  const {t} = useTranslation(props.lng, 'settings-appearance');
  const [appearance, setAppearance] = useState(props.appearance);
  const fields = useMemo(() => {
    return [
      {
        key: 'theme',
        type: 'radio',
        label: t('style.theme.label'),
        detail: t('style.theme.detail'),
        options: ThemeValues.map(theme => {
          return {
            value: theme,
            label: t(`style.theme.select.${theme}`),
          };
        }),
      },
    ] as Array<PreferenceField>;
  }, [t]);

  const handleClick = async (value: Record<string, any>) => {
    const modified = value as Appearance;
    await apiClient.updateAppearance(modified);
    setAppearance(modified);
    changeTheme(modified.theme);
  };

  return (
    <PreferenceForm
      lng={props.lng}
      items={appearance}
      fields={fields}
      onClick={handleClick}
      successLabel={t('save_successful')}
      resetLabel={t('reset')}
      saveLabel={t('save')}
    />
  );
}
