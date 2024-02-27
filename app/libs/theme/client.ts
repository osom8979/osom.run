'use client';

import {UnknownThemeNameError} from '@/app/exceptions';
import {
  DARK_THEME_CLASS,
  DARK_THEME_NAME,
  DARK_DAISYUI_THEME_NAME,
  LIGHT_THEME_CLASS,
  LIGHT_THEME_NAME,
  LIGHT_DAISYUI_THEME_NAME,
  SYSTEM_THEME_NAME,
  THEME_QUALIFIED_NAME,
} from '@/app/libs/theme/common';
import {
  setDarkThemeCookie,
  setLightThemeCookie,
  setSystemThemeCookie,
} from '@/app/libs/theme/cookie';

export function setLightTheme() {
  const elem = document.documentElement;
  console.assert(elem.tagName === 'html');

  if (LIGHT_THEME_CLASS) {
    elem.classList.add(LIGHT_THEME_CLASS);
  }
  if (DARK_THEME_CLASS) {
    elem.classList.remove(DARK_THEME_CLASS);
  }

  elem.setAttribute(THEME_QUALIFIED_NAME, LIGHT_DAISYUI_THEME_NAME);
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

  elem.setAttribute(THEME_QUALIFIED_NAME, DARK_DAISYUI_THEME_NAME);
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

export default function changeTheme(themeKey: string) {
  if (themeKey === LIGHT_THEME_NAME) {
    setLightTheme();
    setLightThemeCookie();
  } else if (themeKey === DARK_THEME_NAME) {
    setDarkTheme();
    setDarkThemeCookie();
  } else if (themeKey === SYSTEM_THEME_NAME) {
    setSystemTheme();
    setSystemThemeCookie();
  } else {
    throw new UnknownThemeNameError(`Unknown theme name: '${themeKey}'`);
  }
}
