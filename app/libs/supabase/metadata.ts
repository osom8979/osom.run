import 'server-only';

import type {User} from '@supabase/gotrue-js';
import {LANGUAGES} from '@/app/libs/i18n/settings';
import {SupportZones} from '@/app/libs/tz/zone';
import {ThemeValues} from '@/app/libs/zod/settings';

export interface Profile {
  nickname: string;
  timezone: string;
  lng: string;
}

export function getProfile(user?: User): Profile {
  const profile = user?.user_metadata?.profile ?? {};
  const nickname = profile.nickname || user?.user_metadata?.full_name;
  const timezone = profile.timezone || SupportZones[0];
  const lng = profile.lng || LANGUAGES[0];
  return {nickname, timezone, lng};
}

export interface Appearance {
  theme: string;
}

export function getAppearance(user?: User): Appearance {
  const appearance = user?.user_metadata?.appearance ?? {};
  const theme = appearance.theme || ThemeValues[0];
  return {theme};
}
