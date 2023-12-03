import 'server-only';

import {createRouteHandlerClient} from '@supabase/auth-helpers-nextjs';
import {cookies} from 'next/headers';
import {NextResponse} from 'next/server';

export const dynamic = 'force-dynamic';

export async function POST(request: Request) {
  console.debug('signin POST');

  const requestUrl = new URL(request.url);
  const formData = await request.formData();
  const email = String(formData.get('email'));
  const password = String(formData.get('password'));

  console.debug(email);
  console.debug(password);

  const supabase = createRouteHandlerClient({cookies});

  const result = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  console.debug(result);

  return NextResponse.redirect(requestUrl.origin, {
    status: 301,
  });
}
