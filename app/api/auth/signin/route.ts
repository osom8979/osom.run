import 'server-only';

import {createRouteHandlerClient} from '@supabase/auth-helpers-nextjs';
import {cookies} from 'next/headers';
import {NextResponse} from 'next/server';
import {z} from 'zod';

export const dynamic = 'force-dynamic';

const schema = z.object({
  email: z.string().email(),
  password: z.string(),
});

export async function POST(request: Request) {
  console.debug('post request:', request);
  const requestUrl = new URL(request.url);
  const formData = await request.formData();

  console.debug('form data:', request);

  const {email, password} = schema.parse({
    email: formData.get('email'),
    password: formData.get('password'),
  });

  console.debug('email:', email);
  console.debug('password:', password);

  const cookieStore = cookies();
  const supabase = createRouteHandlerClient({cookies: () => cookieStore});
  const result = await supabase.auth.signInWithPassword({email, password});

  console.debug('signin successful', result);

  // Returning a 301 status redirects from a POST to a GET route
  // https://developer.mozilla.org/ko/docs/Web/HTTP/Status/301
  return NextResponse.redirect(requestUrl.origin, {status: 301});
}
