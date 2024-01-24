import 'server-only';

import type {User} from '@supabase/gotrue-js';

export interface Profile {
  nickname?: string;
}

export interface OsomSettings {
  profile?: Profile;
}

export function getOsomSettings(user?: User): OsomSettings {
  return user?.user_metadata?.osom_settings ?? {};
}

export function getProfile(user?: User): Profile {
  return getOsomSettings(user).profile ?? {};
}
