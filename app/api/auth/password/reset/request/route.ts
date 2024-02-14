import 'server-only';

import {createRouteHandlerClient} from '@supabase/auth-helpers-nextjs';
import {cookies} from 'next/headers';
import {NextRequest} from 'next/server';
import {badRequest, internalServerError, ok} from '@/app/api/response';
import {EmailSchema} from '@/app/libs/zod/auth';
import {appPaths} from '@/app/paths';

export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
  const formData = await request.formData();
  const validatedFields = EmailSchema.safeParse(formData.get('email'));

  if (!validatedFields.success) {
    return badRequest();
  }

  const cookieStore = cookies();
  const supabase = createRouteHandlerClient({cookies: () => cookieStore});
  const email = validatedFields.data;
  const redirectTo = new URL(appPaths.passwordResetUpdate, request.url);
  const {error} = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: redirectTo.href,
  });

  if (error !== null) {
    console.error('Password reset request error', {email, error});
    return internalServerError();
  }

  console.info('Password reset OK', {email});
  return ok();
}
