'use client';

import Cookies from 'js-cookie';
import {
  COOKIE_THEME_KEY,
  DARK_THEME_CLASS,
  DARK_THEME_COOKIE,
  DARK_THEME_NAME,
  LIGHT_THEME_CLASS,
  LIGHT_THEME_COOKIE,
  LIGHT_THEME_NAME,
  SYSTEM_THEME_COOKIE,
  THEME_QUALIFIED_NAME,
} from '@/app/libs/theme/settings';

export function setThemeCookie(theme: string) {
  Cookies.set(COOKIE_THEME_KEY, theme, {path: '/'});
}

export function setLightThemeCookie() {
  setThemeCookie(LIGHT_THEME_COOKIE);
}

export function setDarkThemeCookie() {
  setThemeCookie(DARK_THEME_COOKIE);
}

export function setSystemThemeCookie() {
  setThemeCookie(SYSTEM_THEME_COOKIE);
}

export function setLightTheme() {
  const elem = document.documentElement;
  console.assert(elem.tagName === 'html');

  if (LIGHT_THEME_CLASS) {
    elem.classList.add(LIGHT_THEME_CLASS);
  }
  if (DARK_THEME_CLASS) {
    elem.classList.remove(DARK_THEME_CLASS);
  }

  elem.setAttribute(THEME_QUALIFIED_NAME, LIGHT_THEME_NAME);
}

export function setDarkTheme() {
  const elem = document.documentElement;
  console.assert(elem.tagName === 'html');

  if (LIGHT_THEME_CLASS) {
    elem.classList.remove(LIGHT_THEME_CLASS);
  }
  if (DARK_THEME_CLASS) {
    elem.classList.add(DARK_THEME_CLASS);
  }

  elem.setAttribute(THEME_QUALIFIED_NAME, DARK_THEME_NAME);
}

export function matchDarkColorScheme() {
  return window.matchMedia('(prefers-color-scheme: dark)').matches;
}

export function setSystemTheme() {
  // On page load or when changing themes, best to add inline in `head` to avoid FOUC
  if (matchDarkColorScheme()) {
    setDarkTheme();
  } else {
    setLightTheme();
  }
}

export class UnknownThemeNameError extends Error {
  constructor(message?: string, options?: ErrorOptions) {
    super(message, options);
  }
}

export default function changeTheme(theme: string) {
  if (theme === 'light') {
    setLightTheme();
    setLightThemeCookie();
  } else if (theme === 'dark') {
    setDarkTheme();
    setDarkThemeCookie();
  } else if (theme === 'system') {
    setSystemTheme();
    setSystemThemeCookie();
  } else {
    throw new UnknownThemeNameError();
  }
}
