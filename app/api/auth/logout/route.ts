import 'server-only';

import {createRouteHandlerClient} from '@supabase/auth-helpers-nextjs';
import {cookies} from 'next/headers';
import {NextResponse} from 'next/server';

export const dynamic = 'force-dynamic';

export async function POST(request: Request) {
  console.assert(request);
  const cookieStore = cookies();
  const supabase = createRouteHandlerClient({cookies: () => cookieStore});
  await supabase.auth.signOut();
  return NextResponse.json({});
}
