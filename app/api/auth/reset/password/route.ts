import 'server-only';

import {createRouteHandlerClient} from '@supabase/auth-helpers-nextjs';
import {StatusCodes} from 'http-status-codes';
import {cookies} from 'next/headers';
import {NextResponse} from 'next/server';
import {EmailSchema} from '@/app/libs/schema/auth';

export const dynamic = 'force-dynamic';

export interface ResetPasswordResponseBody {
  error?: string;
}

export async function POST(request: Request) {
  const formData = await request.formData();
  const validatedFields = EmailSchema.safeParse(formData.get('email'));

  if (!validatedFields.success) {
    return NextResponse.json<ResetPasswordResponseBody>(
      {error: 'Invalid form datas'},
      {status: StatusCodes.BAD_REQUEST}
    );
  }

  const cookieStore = cookies();
  const supabase = createRouteHandlerClient({cookies: () => cookieStore});
  const email = validatedFields.data;
  const requestUrl = new URL(request.url);
  const result = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${requestUrl.origin}/reset/password/update`,
  });

  if (result.error !== null) {
    console.info(`API request failed: ${result.error.message}`);
    return NextResponse.json<ResetPasswordResponseBody>(
      {error: 'Password reset request failed'},
      {status: StatusCodes.UNAUTHORIZED}
    );
  }

  console.info(`Sends a password reset request to an email address: ${email}`);
  return NextResponse.json<ResetPasswordResponseBody>({});
}
