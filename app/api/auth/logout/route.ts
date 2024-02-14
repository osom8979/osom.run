import 'server-only';

import {createRouteHandlerClient} from '@supabase/auth-helpers-nextjs';
import {cookies} from 'next/headers';
import {NextRequest} from 'next/server';
import {internalServerError, ok, unauthorized} from '@/app/api/response';

export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
  console.assert(request);

  const cookieStore = cookies();
  const supabase = createRouteHandlerClient({cookies: () => cookieStore});

  const session = await supabase.auth.getSession();
  if (session.error !== null || session.data.session === null) {
    console.error('No authenticated session exists');
    return unauthorized();
  }

  const email = session.data.session.user.email;
  console.assert(email);

  const {error} = await supabase.auth.signOut();
  if (error !== null) {
    console.error('Log out request error', {email, error});
    return internalServerError();
  }

  console.info('Log out OK', {email});
  return ok();
}
