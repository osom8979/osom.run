import 'server-only';

import {createRouteHandlerClient} from '@supabase/auth-helpers-nextjs';
import {cookies} from 'next/headers';
import {NextRequest} from 'next/server';
import {badRequest, ok, unauthorized} from '@/app/api/response';
import {EmailPasswordSchema} from '@/app/libs/zod/auth';

export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
  const formData = await request.formData();
  const validatedFields = EmailPasswordSchema.safeParse({
    email: formData.get('email'),
    password: formData.get('password'),
  });

  // Return early if the form data is invalid
  if (!validatedFields.success) {
    return badRequest();
  }

  const cookieStore = cookies();
  const supabase = createRouteHandlerClient({cookies: () => cookieStore});
  const {email, password} = validatedFields.data;
  const {error} = await supabase.auth.signInWithPassword({email, password});

  if (error !== null) {
    console.error('Log in request error', {email, error});
    return unauthorized();
  }

  console.info('Log in OK', {email});
  return ok();
}
