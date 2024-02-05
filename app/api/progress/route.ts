import 'server-only';

import {StatusCodes} from 'http-status-codes';
import {NextResponse} from 'next/server';
import type {NewProgress} from '@/app/api/interface';
import {uuid} from '@/app/libs/crypto/uuid';
import {createRedisClient} from '@/app/libs/redis';

export const dynamic = 'force-dynamic';

export async function POST(request: Request) {
  console.assert(request);
  const messageId = uuid();
  const requestObject = {api: '/progress/new', id: messageId};
  const redis = await createRedisClient();
  await redis.lPush('/osom/api/queue', JSON.stringify(requestObject));
  const result = await redis.brPop(`/osom/api/response/${messageId}`, 8);
  if (result === null) {
    console.error('Create progress error');
    return NextResponse.json<NewProgress>(
      {},
      {status: StatusCodes.INTERNAL_SERVER_ERROR}
    );
  }

  const response = JSON.parse(result.element);
  console.info('Create progress OK', {id: response.id});
  return NextResponse.json<NewProgress>({id: response.id});
}
