import 'server-only';

import {NextResponse} from 'next/server';
import createOsomApiServerSideClient from '@/app/libs/osom/server';

export const dynamic = 'force-dynamic';

export async function POST(request: Request, {params}: {params: {code: string}}) {
  console.assert(request);
  const osomApi = createOsomApiServerSideClient();
  const result = await osomApi.anonymousProgressIncrease(params.code);
  return NextResponse.json(result);
}

export async function GET(request: Request, {params}: {params: {code: string}}) {
  console.assert(request);
  const osomApi = createOsomApiServerSideClient();
  const result = await osomApi.anonymousProgressRead(params.code);
  return NextResponse.json(result);
}
