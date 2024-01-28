import 'server-only';

import {NextResponse} from 'next/server';

export const dynamic = 'force-dynamic';

export async function POST(request: Request, {params}: {params: {code: string}}) {
  const url = new URL(request.url);
  return NextResponse.json({url: url, code: params.code, progress: 1});
}
