import 'server-only';

import {createRouteHandlerClient} from '@supabase/auth-helpers-nextjs';
import {StatusCodes} from 'http-status-codes';
import {cookies} from 'next/headers';
import {NextResponse} from 'next/server';
import type {EmptyResponse} from '@/app/api/interface';
import {EmailPasswordSchema} from '@/app/libs/schema/auth';

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
  const requestUrl = new URL(request.url);
  const {error} = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: `${requestUrl.origin}/login`,
    },
  });

  if (error !== null) {
    console.info('Sign up request error', {email, error});
    return NextResponse.json<EmptyResponse>({}, {status: StatusCodes.BAD_REQUEST});
  }

  console.info('Sign up OK', {email});
  return NextResponse.json<EmptyResponse>({});
}
