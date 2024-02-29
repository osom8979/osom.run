import 'server-only';

import type {UserResponse} from '@supabase/gotrue-js';
import {cookies} from 'next/headers';
import {getAppearance} from '@/app/libs/supabase/metadata';
import {getThemeInfo, THEME_COOKIE_KEY} from '@/app/libs/theme/common';

export function findThemeName(userResponse?: UserResponse) {
  if (userResponse && userResponse.error === null) {
    return getAppearance(userResponse.data.user).theme;
  } else {
    const themeCookie = cookies().get(THEME_COOKIE_KEY);
    return themeCookie?.value ?? '';
  }
}

export function findThemeInfo(userResponse?: UserResponse) {
  return getThemeInfo(findThemeName(userResponse));
}
