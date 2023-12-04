import {createMiddlewareClient} from '@supabase/auth-helpers-nextjs';
import {NextRequest, NextResponse} from 'next/server';

export async function upgradeSessionCookies(req: NextRequest, res: NextResponse) {
  // Create a Supabase client configured to use cookies
  const supabase = createMiddlewareClient({req, res});

  // Refresh session if expired - required for Server Components
  // https://supabase.com/docs/guides/auth/auth-helpers/nextjs#managing-session-with-middleware
  await supabase.auth.getSession();
}
