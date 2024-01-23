import 'server-only';

import {createRouteHandlerClient} from '@supabase/auth-helpers-nextjs';
import {StatusCodes} from 'http-status-codes';
import {cookies} from 'next/headers';
import {NextResponse} from 'next/server';
import type {EmptyResponse} from '@/app/api/interface';
import {EmailSchema} from '@/app/libs/schema/auth';
import {appPaths} from '@/app/paths';

export const dynamic = 'force-dynamic';

export async function POST(request: Request) {
  const formData = await request.formData();
  const validatedFields = EmailSchema.safeParse(formData.get('email'));

  if (!validatedFields.success) {
    return NextResponse.json<EmptyResponse>({}, {status: StatusCodes.BAD_REQUEST});
  }

  const cookieStore = cookies();
  const supabase = createRouteHandlerClient({cookies: () => cookieStore});
  const email = validatedFields.data;
  const requestUrl = new URL(request.url);
  const {error} = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${requestUrl.origin}${appPaths.passwordResetUpdate}`,
  });

  if (error !== null) {
    console.error('Password reset request error', {email, error});
    return NextResponse.json<EmptyResponse>({}, {status: StatusCodes.BAD_REQUEST});
  }

  console.info('Password reset OK', {email});
  return NextResponse.json<EmptyResponse>({});
}
