import 'server-only';

import {NextResponse} from 'next/server';
import createOsomApiServerSideClient from '@/app/libs/osom/server';

export const dynamic = 'force-dynamic';

export async function PUT(request: Request) {
  console.assert(request);
  const osomApi = createOsomApiServerSideClient();
  const result = await osomApi.anonymousProgressCreate();
  console.info('Create progress info', result);
  return NextResponse.json(result);
}
