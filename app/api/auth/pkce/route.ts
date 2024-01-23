import 'server-only';

import {createRouteHandlerClient} from '@supabase/auth-helpers-nextjs';
import {cookies} from 'next/headers';
import type {NextRequest} from 'next/server';
import {NextResponse} from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  // This route is required for the server-side auth flow implemented by the Auth
  // Helpers package. It exchanges an auth code for the user's session.
  // https://supabase.com/docs/guides/auth/auth-helpers/nextjs#managing-sign-in-with-code-exchange
  const {origin, searchParams} = new URL(request.url);
  const code = searchParams.get('code');
  const error = searchParams.get('error');
  const next = searchParams.get('next') ?? '/';
  const redirectPath = next.startsWith('/') ? next : `/${next}`;

  if (error) {
    const errorCode = searchParams.get('error_code');
    const errorDescription = searchParams.get('error_description');
    console.error('Exchange code request error', {
      error: {
        name: error,
        code: errorCode,
        description: errorDescription,
      },
    });

    const nextUrl = new URL(`${origin}/login/pkce/error`);
    nextUrl.searchParams.set('reason', 'error');
    nextUrl.searchParams.set('name', error);
    if (errorCode) {
      nextUrl.searchParams.set('code', errorCode);
    }
    if (errorDescription) {
      nextUrl.searchParams.set('description', errorDescription);
    }
    return NextResponse.redirect(nextUrl);
  }

  if (!code) {
    const nextUrl = new URL(`${origin}/login/pkce/error`);
    nextUrl.searchParams.set('reason', 'nocode');
    return NextResponse.redirect(nextUrl);
  }

  const supabase = createRouteHandlerClient({cookies});
  const exchangeCodeResult = await supabase.auth.exchangeCodeForSession(code);
  if (exchangeCodeResult.error) {
    console.error('Exchange code error', {code, error: exchangeCodeResult.error});

    const nextUrl = new URL(`${origin}/login/pkce/error`);
    nextUrl.searchParams.set('reason', 'rejected');
    return NextResponse.redirect(nextUrl);
  }

  // URL to redirect to after sign in process completes
  console.info('Exchange code OK', {code});
  console.assert(redirectPath.startsWith('/'));
  return NextResponse.redirect(`${origin}${redirectPath}`);
}
