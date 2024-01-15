import {z} from 'zod';

/**
 * Password strength and leaked password protection
 * https://supabase.com/dashboard/project/_/settings/auth
 */
export const MINIMUM_PASSWORD_LENGTH = 8;
export const MAXIMUM_PASSWORD_LENGTH = 72;

export const AT_LEAST_ONE_LOWERCASE = /^(?=.*[a-z]).+$/g;
export const AT_LEAST_ONE_UPPERCASE = /^(?=.*[A-Z]).+$/g;
export const AT_LEAST_ONE_DIGIT = /^(?=.*[0-9]).+$/g;
export const AT_LEAST_ONE_SYMBOL = /^(?=.*[^a-zA-Z0-9]).+$/g;

export const LoginSchema = z.object({
  email: z.string().email(),
  password: z
    .string()
    .min(MINIMUM_PASSWORD_LENGTH)
    .max(MAXIMUM_PASSWORD_LENGTH)
    .regex(AT_LEAST_ONE_LOWERCASE, 'At least one lowercase expected')
    .regex(AT_LEAST_ONE_UPPERCASE, 'At least one uppercase expected')
    .regex(AT_LEAST_ONE_DIGIT, 'At least one digit expected')
    .regex(AT_LEAST_ONE_SYMBOL, 'At least one symbol expected'),
});
