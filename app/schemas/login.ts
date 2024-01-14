import {z} from 'zod';
import useTranslation from '@/app/libs/i18n/server';

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

export async function getLoginSchema(lng?: string) {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const {t} = await useTranslation(lng, 'schemas/login');
  return z.object({
    email: z
      .string({
        required_error: t('required_email'),
        invalid_type_error: t('invalid_email_type'),
      })
      .email(t('invalid_email_format')),
    password: z
      .string({
        required_error: t('required_password'),
        invalid_type_error: t('invalid_password_type'),
      })
      .min(
        MINIMUM_PASSWORD_LENGTH,
        t('minimum_password_length', {length: MINIMUM_PASSWORD_LENGTH})
      )
      .max(
        MAXIMUM_PASSWORD_LENGTH,
        t('maximum_password_length', {length: MAXIMUM_PASSWORD_LENGTH})
      )
      .regex(AT_LEAST_ONE_LOWERCASE, t('at_least_one_lowercase'))
      .regex(AT_LEAST_ONE_UPPERCASE, t('at_least_one_uppercase'))
      .regex(AT_LEAST_ONE_DIGIT, t('at_least_one_digit'))
      .regex(AT_LEAST_ONE_SYMBOL, t('at_least_one_symbol')),
  });
}
