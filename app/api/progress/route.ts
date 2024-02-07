import 'server-only';

import {StatusCodes} from 'http-status-codes';
import {NextResponse} from 'next/server';
import type {NewProgress} from '@/app/api/interface';
import {progressCreate} from '@/app/libs/osom/mq/protocol';

export const dynamic = 'force-dynamic';

export async function POST(request: Request) {
  console.assert(request);
  const response = await progressCreate();
  if (response.error !== null) {
    console.error('Create progress error', {error: response.error});
    return NextResponse.json<NewProgress>(
      {},
      {status: StatusCodes.INTERNAL_SERVER_ERROR}
    );
  }

  const id = response.data.id;
  console.info('Create progress OK', {id});
  return NextResponse.json<NewProgress>({id: id});
}
