import 'server-only';

import {createRouteHandlerClient} from '@supabase/auth-helpers-nextjs';
import {StatusCodes} from 'http-status-codes';
import {cookies} from 'next/headers';
import {NextResponse} from 'next/server';
import type {EmptyResponse} from '@/app/api/interface';

export const dynamic = 'force-dynamic';

export async function POST(request: Request) {
  console.assert(request);

  const cookieStore = cookies();
  const supabase = createRouteHandlerClient({cookies: () => cookieStore});

  const session = await supabase.auth.getSession();
  if (session.error !== null || session.data.session === null) {
    console.error('Log out session error');
    return NextResponse.json<EmptyResponse>({}, {status: StatusCodes.BAD_REQUEST});
  }

  const email = session.data.session.user.email;
  const {error} = await supabase.auth.signOut();
  if (error !== null) {
    console.error('Log out request error', {email, error});
    return NextResponse.json<EmptyResponse>({}, {status: StatusCodes.BAD_REQUEST});
  }

  console.info('Log out OK', {email});
  return NextResponse.json<EmptyResponse>({});
}
