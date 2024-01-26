import 'server-only';

import type {User} from '@supabase/gotrue-js';
import {LanguagesValues, ThemeValues} from '@/app/libs/schema/auth';

export const NO_NICKNAME = '';
export const NO_TIMEZONE = '';

export interface Profile {
  nickname: string;
  timezone: string;
}

export function getProfile(user?: User): Profile {
  return {
    nickname: NO_NICKNAME,
    timezone: NO_TIMEZONE,
    ...user?.user_metadata?.profile,
  };
}

export interface Appearance {
  lng: string;
  theme: string;
}

export function getAppearance(user?: User): Appearance {
  return {
    lng: LanguagesValues[0],
    theme: ThemeValues[0],
    ...user?.user_metadata?.appearance,
  };
}
