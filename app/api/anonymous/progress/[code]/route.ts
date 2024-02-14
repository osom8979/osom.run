import 'server-only';

import {NextRequest} from 'next/server';
import {ok} from '@/app/api/response';
import createOsomApiServerSideClient from '@/app/libs/osom/server';

export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest, {params}: {params: {code: string}}) {
  console.assert(request);
  const osomApi = createOsomApiServerSideClient();
  const result = await osomApi.anonymousProgressIncrease(params.code);
  console.info('Increase progress OK', result);
  return ok(result);
}

export async function GET(request: NextRequest, {params}: {params: {code: string}}) {
  console.assert(request);
  const osomApi = createOsomApiServerSideClient();
  const result = await osomApi.anonymousProgressRead(params.code);
  console.info('Read progress OK', result);
  return ok(result);
}
