import 'server-only';

import {createRouteHandlerClient} from '@supabase/auth-helpers-nextjs';
import {cookies} from 'next/headers';
import {NextRequest} from 'next/server';
import type {LoginOAuthResponse} from '@/app/api/interface';
import {apiPaths} from '@/app/api/path';
import {badRequest, ok, unauthorized} from '@/app/api/response';
import {ProviderSchema} from '@/app/libs/zod/auth';

export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
  const formData = await request.formData();
  const validatedFields = ProviderSchema.safeParse(formData.get('provider'));
  if (!validatedFields.success) {
    return badRequest<LoginOAuthResponse>({});
  }

  const redirectTo = new URL(apiPaths.authLoginPkce, request.url);
  const cookieStore = cookies();
  const supabase = createRouteHandlerClient({cookies: () => cookieStore});
  const {data, error} = await supabase.auth.signInWithOAuth({
    provider: validatedFields.data,
    options: {
      redirectTo: redirectTo.href,
      skipBrowserRedirect: true,
    },
  });

  const {provider, url} = data;
  if (error !== null) {
    console.error('OAuth log in request error', {provider, url, error});
    return unauthorized<LoginOAuthResponse>({});
  }

  console.info('OAuth log in OK', {provider, url});
  return ok<LoginOAuthResponse>({url: url || undefined});
}
