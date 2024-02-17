'use client';

import Cookies from 'js-cookie';

export const COOKIE_THEME_KEY = 'osom-theme';

export function setThemeCookie(theme: string) {
  Cookies.set(COOKIE_THEME_KEY, theme, {path: '/'});
}

export function setLightThemeCookie() {
  setThemeCookie('light');
}

export function setDarkThemeCookie() {
  setThemeCookie('dark');
}

export function removeThemeCookie() {
  if (Cookies.get(COOKIE_THEME_KEY)) {
    Cookies.remove(COOKIE_THEME_KEY);
  }
}

export class UnknownThemeNameError extends Error {
  constructor(message?: string, options?: ErrorOptions) {
    super(message, options);
  }
}

export function setLightTheme() {
  document.documentElement.classList.remove('dark');
  document.documentElement.setAttribute('data-theme', 'cupcake');
}

export function setDarkTheme() {
  document.documentElement.classList.add('dark');
  document.documentElement.setAttribute('data-theme', 'business');
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

export default function changeTheme(theme: string) {
  if (theme === 'light') {
    setLightTheme();
    setLightThemeCookie();
  } else if (theme === 'dark') {
    setDarkTheme();
    setDarkThemeCookie();
  } else if (theme === 'system') {
    setSystemTheme();
    removeThemeCookie();
  } else {
    throw new UnknownThemeNameError();
  }
}
