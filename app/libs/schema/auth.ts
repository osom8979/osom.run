import {z} from 'zod';

/**
 * Password strength and leaked password protection
 * https://supabase.com/dashboard/project/_/settings/auth
 */
export const MINIMUM_PASSWORD_LENGTH = 8;

/**
 * If the password is larger than 72 chars, it will be truncated to the first 72 chars.
 * https://supabase.com/docs/reference/javascript/auth-signup?example=sign-up
 */
export const MAXIMUM_PASSWORD_LENGTH = 72;

export const AT_LEAST_ONE_LOWERCASE = /^(?=.*[a-z]).+$/g;
export const AT_LEAST_ONE_UPPERCASE = /^(?=.*[A-Z]).+$/g;
export const AT_LEAST_ONE_DIGIT = /^(?=.*[0-9]).+$/g;
export const AT_LEAST_ONE_SYMBOL = /^(?=.*[^a-zA-Z0-9]).+$/g;

export const EmailSchema = z.string().email();
export const PasswordSchema = z
  .string()
  .min(MINIMUM_PASSWORD_LENGTH)
  .max(MAXIMUM_PASSWORD_LENGTH)
  .regex(AT_LEAST_ONE_LOWERCASE, 'At least one lowercase expected')
  .regex(AT_LEAST_ONE_UPPERCASE, 'At least one uppercase expected')
  .regex(AT_LEAST_ONE_DIGIT, 'At least one digit expected')
  .regex(AT_LEAST_ONE_SYMBOL, 'At least one symbol expected');

export const EmailPasswordSchema = z.object({
  email: EmailSchema,
  password: PasswordSchema,
});

export const CodePasswordSchema = z.object({
  code: z.string(),
  password: PasswordSchema,
});

export const ProviderValues = ['google', 'github', 'discord'] as const;
export type Providers = (typeof ProviderValues)[number];
export const ProviderSchema = z.enum(ProviderValues);

export const MAXIMUM_NICKNAME_LENGTH = 68;
export const NicknameSchema = z.string().max(MAXIMUM_NICKNAME_LENGTH);
export const ProfileSchema = z.object({
  nickname: NicknameSchema,
});
