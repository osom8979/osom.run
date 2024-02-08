import 'server-only';

import {NextResponse} from 'next/server';
import type {NewProgress} from '@/app/api/interface';
import createOsomApiServerSideClient from '@/app/libs/osom/api/server';

export const dynamic = 'force-dynamic';

export async function POST(request: Request) {
  console.assert(request);
  const osomApi = createOsomApiServerSideClient();
  const response = await osomApi.progressCreate();
  const id = response.id;
  console.info('Create progress OK', {id});
  return NextResponse.json<NewProgress>({id: id});
}
