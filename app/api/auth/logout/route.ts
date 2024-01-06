import 'server-only';

import {createRouteHandlerClient} from '@supabase/auth-helpers-nextjs';
import {StatusCodes} from 'http-status-codes';
import {cookies} from 'next/headers';
import {NextResponse} from 'next/server';

export const dynamic = 'force-dynamic';

export async function POST(request: Request) {
  const cookieStore = cookies();
  const supabase = createRouteHandlerClient({cookies: () => cookieStore});
  await supabase.auth.signOut();

  // Returning a 301 status redirects from a POST to a GET route
  // https://developer.mozilla.org/ko/docs/Web/HTTP/Status/301
  const requestUrl = new URL(request.url);
  return NextResponse.redirect(requestUrl.origin, {
    status: StatusCodes.MOVED_PERMANENTLY,
  });
}
