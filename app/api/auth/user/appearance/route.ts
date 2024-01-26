import 'server-only';

import {createRouteHandlerClient} from '@supabase/auth-helpers-nextjs';
import {StatusCodes} from 'http-status-codes';
import {cookies} from 'next/headers';
import {NextResponse} from 'next/server';
import type {EmptyResponse} from '@/app/api/interface';
import type {Appearance} from '@/app/libs/auth/metadata';
import {AppearanceSchema} from '@/app/libs/schema/auth';

export const dynamic = 'force-dynamic';

export async function POST(request: Request) {
  const formData = await request.formData();
  const validatedFields = AppearanceSchema.safeParse({
    lng: formData.get('lng'),
    theme: formData.get('theme'),
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
  console.assert(email);

  const {lng, theme} = validatedFields.data;
  const appearance = {lng, theme} as Appearance;
  const {error} = await supabase.auth.updateUser({data: {appearance}});
  if (error !== null) {
    console.error('Update appearance request error', {email, error});
    return NextResponse.json<EmptyResponse>(
      {},
      {status: StatusCodes.INTERNAL_SERVER_ERROR}
    );
  }

  console.info('Update appearance OK', {email, appearance});
  return NextResponse.json<EmptyResponse>({});
}
