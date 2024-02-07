import 'server-only';

import {createRouteHandlerClient} from '@supabase/auth-helpers-nextjs';
import {StatusCodes} from 'http-status-codes';
import {cookies} from 'next/headers';
import {NextResponse} from 'next/server';
import type {EmptyResponse} from '@/app/api/interface';
import type {Database} from '@/app/libs/supabase/supabase';

export const dynamic = 'force-dynamic';

export async function POST(request: Request, {params}: {params: {code: string}}) {
  const cookieStore = cookies();
  const supabase = createRouteHandlerClient<Database>({cookies: () => cookieStore});
  const prev = await supabase.from('progress').select('value').eq('id', params.code);
  if (prev.error !== null) {
    console.error('Progress select error', {error: prev.error});
    return NextResponse.json<EmptyResponse>(
      {},
      {status: StatusCodes.INTERNAL_SERVER_ERROR}
    );
  }

  const nextValue = prev.data[0].value + 10;
  const next = await supabase
    .from('progress')
    .update({value: nextValue})
    .eq('id', params.code);
  if (next.error !== null) {
    console.error('Progress update error', {error: next.error});
    return NextResponse.json<EmptyResponse>(
      {},
      {status: StatusCodes.INTERNAL_SERVER_ERROR}
    );
  }

  const url = new URL(request.url);
  return NextResponse.json({url: url, code: params.code, progress: nextValue});
}
