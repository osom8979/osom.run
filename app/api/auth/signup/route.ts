import 'server-only';

import {createRouteHandlerClient} from '@supabase/auth-helpers-nextjs';
import {cookies} from 'next/headers';
import {NextRequest} from 'next/server';
import {apiPaths} from '@/app/api/path';
import {badRequest, internalServerError, ok} from '@/app/api/response';
import {EmailPasswordSchema} from '@/app/libs/zod/auth';

export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
  const formData = await request.formData();
  const validatedFields = EmailPasswordSchema.safeParse({
    email: formData.get('email'),
    password: formData.get('password'),
  });

  if (!validatedFields.success) {
    return badRequest();
  }

  const cookieStore = cookies();
  const supabase = createRouteHandlerClient({cookies: () => cookieStore});
  const {email, password} = validatedFields.data;
  const redirectTo = new URL(apiPaths.authLoginPkce, request.url);

  // [INFORMATION] If signup is successful,
  // the exchange code for the session is added as a query-parameter.
  const options = {emailRedirectTo: redirectTo.href};
  const {error} = await supabase.auth.signUp({email, password, options});

  if (error !== null) {
    console.error('Sign up request error', {email, error});
    return internalServerError();
  }

  console.info('Sign up OK', {email});
  return ok();
}
