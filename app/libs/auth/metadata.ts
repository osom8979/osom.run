import 'server-only';

import type {User} from '@supabase/gotrue-js';
import {SupabaseClient} from '@supabase/supabase-js';

export interface Profile {
  nickname?: string;
}

export interface Settings {
  profile?: Profile;
}

export function getSettings(user?: User): Settings {
  return user?.user_metadata?.osom_settings ?? {};
}

export async function updateSettings(
  supabaseClient: SupabaseClient,
  settings: Settings
) {
  return await supabaseClient.auth.updateUser({data: {osom_settings: settings}});
}
