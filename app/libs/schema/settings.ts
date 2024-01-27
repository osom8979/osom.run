import {z} from 'zod';
import {SupportZones} from '@/app/libs/chrono/zone';

export const MAXIMUM_NICKNAME_LENGTH = 68;

export const NicknameSchema = z.string().max(MAXIMUM_NICKNAME_LENGTH);
export const TimezoneSchema = z.enum(SupportZones);

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
