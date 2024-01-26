import 'server-only';

import {createRouteHandlerClient} from '@supabase/auth-helpers-nextjs';
import {StatusCodes} from 'http-status-codes';
import {cookies} from 'next/headers';
import {NextResponse} from 'next/server';
import type {EmptyResponse} from '@/app/api/interface';
import {CodePasswordSchema} from '@/app/libs/schema/auth';

export const dynamic = 'force-dynamic';

export async function POST(request: Request) {
  const formData = await request.formData();
  const validatedFields = CodePasswordSchema.safeParse({
    code: formData.get('code'),
    password: formData.get('password'),
  });

  if (!validatedFields.success) {
    return NextResponse.json<EmptyResponse>({}, {status: StatusCodes.BAD_REQUEST});
  }

  const cookieStore = cookies();
  const supabase = createRouteHandlerClient({cookies: () => cookieStore});
  const {code, password} = validatedFields.data;

  const exchangeResult = await supabase.auth.exchangeCodeForSession(code);
  if (exchangeResult.error !== null) {
    console.error('Exchange code error', {code, error: exchangeResult.error});
    return NextResponse.json<EmptyResponse>({}, {status: StatusCodes.UNAUTHORIZED});
  }

  const updateResult = await supabase.auth.updateUser({password});
  if (updateResult.error !== null) {
    console.error('Update password request error', {error: updateResult.error});
    return NextResponse.json<EmptyResponse>(
      {},
      {status: StatusCodes.INTERNAL_SERVER_ERROR}
    );
  }

  console.info('Update password OK', {email: exchangeResult.data.user.email});
  return NextResponse.json<EmptyResponse>({});
}
