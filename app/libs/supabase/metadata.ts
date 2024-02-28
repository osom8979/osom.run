import type {User} from '@supabase/gotrue-js';
import {FALLBACK_LANGUAGE} from '@/app/libs/i18n/settings';
import {SYSTEM_THEME_NAME} from '@/app/libs/theme/common';
import {ZONE_LUXON_SYSTEM} from '@/app/libs/tz/zone';

export interface Profile {
  nickname: string;
  timezone: string;
  lng: string;
}

export function getRawProfile(user?: User): Partial<Profile> {
  return user?.user_metadata?.profile ?? {};
}

export function getProfile(user?: User): Profile {
  const profile = getRawProfile(user);
  const nickname = profile.nickname || user?.user_metadata?.full_name;
  const timezone = profile.timezone || ZONE_LUXON_SYSTEM;
  const lng = profile.lng || FALLBACK_LANGUAGE;
  return {nickname, timezone, lng};
}

export interface Appearance {
  theme: string;
}

export function getAppearance(user?: User): Appearance {
  const appearance = user?.user_metadata?.appearance ?? {};
  const theme = appearance.theme || SYSTEM_THEME_NAME;
  return {theme};
}
