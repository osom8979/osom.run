import 'server-only';

import {createRouteHandlerClient} from '@supabase/auth-helpers-nextjs';
import {StatusCodes} from 'http-status-codes';
import {cookies} from 'next/headers';
import {NextResponse} from 'next/server';
import type {EmptyResponse} from '@/app/api/interface';
import type {Profile} from '@/app/libs/auth/metadata';
import {ProfileSchema} from '@/app/libs/schema/settings';

export const dynamic = 'force-dynamic';

export async function POST(request: Request) {
  const formData = await request.formData();
  const validatedFields = ProfileSchema.safeParse({
    nickname: formData.get('nickname'),
    timezone: formData.get('timezone'),
    lng: formData.get('lng'),
  });

  if (!validatedFields.success) {
    return NextResponse.json<EmptyResponse>({}, {status: StatusCodes.BAD_REQUEST});
  }

  const cookieStore = cookies();
  const supabase = createRouteHandlerClient({cookies: () => cookieStore});
  const session = await supabase.auth.getSession();
  if (session.error !== null || session.data.session === null) {
    console.error('No authenticated session exists');
    return NextResponse.json<EmptyResponse>({}, {status: StatusCodes.UNAUTHORIZED});
  }

  const email = session.data.session.user.email;
  const profile = validatedFields.data as Profile;
  const {error} = await supabase.auth.updateUser({data: {profile}});
  if (error !== null) {
    console.error('Update profile request error', {email, error});
    return NextResponse.json<EmptyResponse>(
      {},
      {status: StatusCodes.INTERNAL_SERVER_ERROR}
    );
  }

  console.info('Update profile OK', {email, profile});
  return NextResponse.json<EmptyResponse>({});
}
