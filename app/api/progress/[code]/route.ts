import 'server-only';

import {NextResponse} from 'next/server';
import createOsomApiServerSideClient from '@/app/libs/osom/api/server';

export const dynamic = 'force-dynamic';

export async function POST(request: Request, {params}: {params: {code: string}}) {
  console.assert(request);
  const osomApi = createOsomApiServerSideClient();
  const response = await osomApi.progressIncrease(params.code);
  const url = new URL(request.url);
  return NextResponse.json({url: url, code: params.code, progress: response.value});
}

// export async function GET(request: Request, {params}: {params: {code: string}}) {
//   // TODO
// }
