import 'server-only';

import {createRouteHandlerClient} from '@supabase/auth-helpers-nextjs';
import {StatusCodes} from 'http-status-codes';
import {cookies} from 'next/headers';
import {NextResponse} from 'next/server';
import type {EmptyResponse} from '@/app/api/interface';
import {apiPaths} from '@/app/api/path';
import {EmailPasswordSchema} from '@/app/libs/zod/auth';

export const dynamic = 'force-dynamic';

export async function POST(request: Request) {
  const formData = await request.formData();
  const validatedFields = EmailPasswordSchema.safeParse({
    email: formData.get('email'),
    password: formData.get('password'),
  });

  if (!validatedFields.success) {
    return NextResponse.json<EmptyResponse>({}, {status: StatusCodes.BAD_REQUEST});
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
    return NextResponse.json<EmptyResponse>(
      {},
      {status: StatusCodes.INTERNAL_SERVER_ERROR}
    );
  }

  console.info('Sign up OK', {email});
  return NextResponse.json<EmptyResponse>({});
}
