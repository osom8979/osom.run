import 'server-only';

import type {User} from '@supabase/gotrue-js';
import {LanguagesValues, ThemeValues} from '@/app/libs/schema/settings';

export const NO_NICKNAME = '';
export const NO_TIMEZONE = '';

export interface Profile {
  nickname: string;
  lng: string;
  timezone: string;
}

export function getProfile(user?: User): Profile {
  return {
    nickname: NO_NICKNAME,
    lng: LanguagesValues[0],
    timezone: NO_TIMEZONE,
    ...user?.user_metadata?.profile,
  };
}

export interface Appearance {
  theme: string;
}

export function getAppearance(user?: User): Appearance {
  return {
    theme: ThemeValues[0],
    ...user?.user_metadata?.appearance,
  };
}
