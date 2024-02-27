'use client';

import Cookies from 'js-cookie';
import {
  THEME_COOKIE_KEY,
  DARK_THEME_NAME,
  LIGHT_THEME_NAME,
  SYSTEM_THEME_NAME,
} from '@/app/libs/theme/common';

export function setThemeCookie(theme: string) {
  Cookies.set(THEME_COOKIE_KEY, theme, {path: '/'});
}

export function getThemeCookie() {
  return Cookies.get(THEME_COOKIE_KEY);
}

export function setLightThemeCookie() {
  setThemeCookie(LIGHT_THEME_NAME);
}

export function setDarkThemeCookie() {
  setThemeCookie(DARK_THEME_NAME);
}

export function setSystemThemeCookie() {
  setThemeCookie(SYSTEM_THEME_NAME);
}
