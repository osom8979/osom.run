import 'server-only';

import {createRouteHandlerClient} from '@supabase/auth-helpers-nextjs';
import {StatusCodes} from 'http-status-codes';
import {cookies} from 'next/headers';
import {NextResponse} from 'next/server';
import type {LoginOAuthResponse} from '@/app/api/interface';
import {ProviderSchema} from '@/app/libs/schema/auth';

export const dynamic = 'force-dynamic';

export async function POST(request: Request) {
  const formData = await request.formData();
  const validatedFields = ProviderSchema.safeParse(formData.get('provider'));
  if (!validatedFields.success) {
    return NextResponse.json<LoginOAuthResponse>({}, {status: StatusCodes.BAD_REQUEST});
  }

  const {origin} = new URL(request.url);
  const cookieStore = cookies();
  const supabase = createRouteHandlerClient({cookies: () => cookieStore});
  const {data, error} = await supabase.auth.signInWithOAuth({
    provider: validatedFields.data,
    options: {
      redirectTo: `${origin}/api/auth/pkce`,
      skipBrowserRedirect: true,
    },
  });

  const {provider, url} = data;
  if (error !== null) {
    console.warn('OAuth log in request error', {provider, url, error});
    return NextResponse.json<LoginOAuthResponse>(
      {},
      {status: StatusCodes.UNAUTHORIZED}
    );
  }

  console.info('OAuth log in OK', {provider, url});
  return NextResponse.json<LoginOAuthResponse>({url: url || undefined});
}
