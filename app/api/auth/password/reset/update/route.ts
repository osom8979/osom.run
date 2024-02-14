import 'server-only';

import {createRouteHandlerClient} from '@supabase/auth-helpers-nextjs';
import {cookies} from 'next/headers';
import {NextRequest} from 'next/server';
import {badRequest, internalServerError, ok, unauthorized} from '@/app/api/response';
import {CodePasswordSchema} from '@/app/libs/zod/auth';

export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
  const formData = await request.formData();
  const validatedFields = CodePasswordSchema.safeParse({
    code: formData.get('code'),
    password: formData.get('password'),
  });

  if (!validatedFields.success) {
    return badRequest();
  }

  const cookieStore = cookies();
  const supabase = createRouteHandlerClient({cookies: () => cookieStore});
  const {code, password} = validatedFields.data;

  const exchangeResult = await supabase.auth.exchangeCodeForSession(code);
  if (exchangeResult.error !== null) {
    console.error('Exchange code error', {code, error: exchangeResult.error});
    return unauthorized();
  }

  const updateResult = await supabase.auth.updateUser({password});
  if (updateResult.error !== null) {
    console.error('Update password request error', {error: updateResult.error});
    return internalServerError();
  }

  console.info('Update password OK', {email: exchangeResult.data.user.email});
  return ok();
}
