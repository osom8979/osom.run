import 'server-only';

import {NextRequest} from 'next/server';
import {requestOsomApi} from '@/app/libs/osom/server';

export const dynamic = 'force-dynamic';

export async function PUT(request: NextRequest) {
  console.assert(request);
  return await requestOsomApi(
    async osomApi => {
      return await osomApi.anonymousProgressCreate();
    },
    {prefix: 'Create progress'}
  );
}
