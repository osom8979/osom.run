import 'server-only';

import {NextRequest} from 'next/server';
import {requestOsomApi} from '@/app/libs/osom/server';

export const dynamic = 'force-dynamic';

interface Props {
  params: {code: string};
}

async function findModifier(request: NextRequest) {
  try {
    const formData = await request.formData();
    return formData.get('modifier') as string | null;
  } catch (e) {
    return null;
  }
}

export async function POST(request: NextRequest, props: Props) {
  const {code} = props.params;
  const modifier = await findModifier(request);

  if (!modifier || modifier.match(/^[+-].*/) != null) {
    const value = modifier ? Number.parseFloat(modifier) : undefined;
    return await requestOsomApi(
      async osomApi => await osomApi.anonymousProgressIncrease(code, {value}),
      {prefix: `Increase progress (id=${code},value=${value})`}
    );
  } else {
    const value = Number.parseFloat(modifier);
    return await requestOsomApi(
      async osomApi => await osomApi.anonymousProgressUpdate(code, {value}),
      {prefix: `Update progress (id=${code},value=${value})`}
    );
  }
}

export async function GET(request: NextRequest, props: Props) {
  console.assert(request);
  const {code} = props.params;
  return await requestOsomApi(
    async osomApi => await osomApi.anonymousProgressRead(code),
    {prefix: `Read progress (${code})`}
  );
}
