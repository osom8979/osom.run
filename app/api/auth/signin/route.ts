import 'server-only';

import {createRouteHandlerClient} from '@supabase/auth-helpers-nextjs';
import {cookies} from 'next/headers';
import {NextResponse} from 'next/server';

export const dynamic = 'force-dynamic';

export async function POST(request: Request) {
  const requestUrl = new URL(request.url);
  const formData = await request.formData();
  const email = String(formData.get('email'));
  const password = String(formData.get('password'));
  const supabase = createRouteHandlerClient({cookies});
  const result = await supabase.auth.signInWithPassword({email, password});

  console.debug('signin successful', result);

  // Returning a 301 status redirects from a POST to a GET route
  // https://developer.mozilla.org/ko/docs/Web/HTTP/Status/301
  return NextResponse.redirect(requestUrl.origin, {status: 301});
}
