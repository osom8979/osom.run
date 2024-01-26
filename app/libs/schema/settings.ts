import {z} from 'zod';

export const MAXIMUM_NICKNAME_LENGTH = 68;
export const MAXIMUM_TIMEZONE_LENGTH = 68;

export const NicknameSchema = z.string().max(MAXIMUM_NICKNAME_LENGTH);
export const TimezoneSchema = z.string().max(MAXIMUM_TIMEZONE_LENGTH);

export const LanguagesValues = ['en', 'ko'] as const;
export const LngSchema = z.enum(LanguagesValues);

export const ProfileSchema = z.object({
  nickname: NicknameSchema,
  timezone: TimezoneSchema,
  lng: LngSchema,
});

export const ThemeValues = ['system', 'light', 'dark'] as const;
export const ThemeSchema = z.enum(ThemeValues);

export const AppearanceSchema = z.object({
  theme: ThemeSchema,
});
