import 'server-only';

import {StatusCodes} from 'http-status-codes';
import {NextResponse} from 'next/server';
import type {NewProgress} from '@/app/api/interface';
import {createProgress} from '@/app/libs/osom/mq/protocol';

export const dynamic = 'force-dynamic';

export async function POST(request: Request) {
  console.assert(request);
  const response = await createProgress();
  if (response.error !== null) {
    console.error('Create progress error', {error: response.error});
    return NextResponse.json<NewProgress>(
      {},
      {status: StatusCodes.INTERNAL_SERVER_ERROR}
    );
  }

  const uuid = response.data.uuid;
  console.info('Create progress OK', {uuid});
  return NextResponse.json<NewProgress>({uuid: uuid});
}
