import 'server-only';

import type {User} from '@supabase/gotrue-js';

export interface Profile {
  nickname: string;
}

export function getProfile(user?: User): Profile {
  return {nickname: '', ...user?.user_metadata?.profile};
}
