import {UnknownThemeNameError} from '@/app/exceptions';

export const THEME_COOKIE_KEY = 'osom-theme';
export const THEME_QUALIFIED_NAME = 'data-theme';

export const ThemeValues = ['system', 'light', 'dark'] as const;
export type Themes = (typeof ThemeValues)[number];

export const SYSTEM_THEME_NAME = ThemeValues[0];
export const LIGHT_THEME_NAME = ThemeValues[1];
export const DARK_THEME_NAME = ThemeValues[2];

export const LIGHT_THEME_CLASS = '';
export const DARK_THEME_CLASS = 'dark';

export const LIGHT_DAISYUI_THEME_NAME = 'light';
export const DARK_DAISYUI_THEME_NAME = 'dark';

export interface ThemeInfo {
  className: string;
  dataTheme: string;
}

export function asThemesType(theme?: string) {
  if (!theme) {
    return SYSTEM_THEME_NAME as Themes;
  }

  if (theme === SYSTEM_THEME_NAME) {
    return SYSTEM_THEME_NAME as Themes;
  } else if (theme === LIGHT_THEME_NAME) {
    return LIGHT_THEME_NAME as Themes;
  } else if (theme === DARK_THEME_NAME) {
    return DARK_THEME_NAME as Themes;
  }

  throw new UnknownThemeNameError(`Unknown theme name: '${theme}'`);
}

export function getThemeInfo(themeName?: string): ThemeInfo {
  const theme = asThemesType(themeName);
  if (theme === LIGHT_THEME_NAME) {
    return {className: LIGHT_THEME_CLASS, dataTheme: LIGHT_DAISYUI_THEME_NAME};
  } else if (theme === DARK_THEME_NAME) {
    return {className: DARK_THEME_CLASS, dataTheme: DARK_DAISYUI_THEME_NAME};
  } else {
    console.assert(theme === SYSTEM_THEME_NAME);
    return {className: '', dataTheme: ''};
  }
}
