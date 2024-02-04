import 'server-only';

import {createRouteHandlerClient} from '@supabase/auth-helpers-nextjs';
import {StatusCodes} from 'http-status-codes';
import {cookies} from 'next/headers';
import {NextResponse} from 'next/server';
import type {NewProgress} from '@/app/api/interface';
import type {Database} from '@/app/libs/supabase/supabase';

export const dynamic = 'force-dynamic';

export async function POST(request: Request) {
  console.assert(request);

  const cookieStore = cookies();
  const supabase = createRouteHandlerClient<Database>({cookies: () => cookieStore});
  const {data, error} = await supabase.from('progress').insert({}).select();

  if (error !== null) {
    console.error('Create progress error', {error});
    return NextResponse.json<NewProgress>(
      {},
      {status: StatusCodes.INTERNAL_SERVER_ERROR}
    );
  }

  console.assert(data.length === 1);
  const id = data[0].id;
  console.info('Create progress OK', {id});
  return NextResponse.json<NewProgress>({id});
}
