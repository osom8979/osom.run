import 'server-only';

import type {User} from '@supabase/gotrue-js';
import {SupportZones} from '@/app/libs/chrono/zone';
import {LanguagesValues, ThemeValues} from '@/app/libs/schema/settings';

export interface Profile {
  nickname: string;
  timezone: string;
  lng: string;
}

export function getProfile(user?: User): Profile {
  const profile = user?.user_metadata?.profile ?? {};
  const nickname = profile.nickname || user?.user_metadata?.full_name;
  const timezone = profile.timezone || SupportZones[0];
  const lng = LanguagesValues[0];
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
