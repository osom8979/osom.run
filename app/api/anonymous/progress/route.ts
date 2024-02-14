import 'server-only';

import {NextRequest} from 'next/server';
import {ok} from '@/app/api/response';
import createOsomApiServerSideClient from '@/app/libs/osom/server';

export const dynamic = 'force-dynamic';

export async function PUT(request: NextRequest) {
  console.assert(request);
  const osomApi = createOsomApiServerSideClient();
  const result = await osomApi.anonymousProgressCreate();
  console.info('Create progress OK', result);
  return ok(result);
}
