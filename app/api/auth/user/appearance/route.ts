import 'server-only';

import {createRouteHandlerClient} from '@supabase/auth-helpers-nextjs';
import {cookies} from 'next/headers';
import {NextRequest} from 'next/server';
import {badRequest, internalServerError, ok, unauthorized} from '@/app/api/response';
import type {Appearance} from '@/app/libs/supabase/metadata';
import {AppearanceSchema} from '@/app/libs/zod/settings';

export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
  const formData = await request.formData();
  const validatedFields = AppearanceSchema.safeParse({
    theme: formData.get('theme'),
  });

  if (!validatedFields.success) {
    return badRequest();
  }

  const cookieStore = cookies();
  const supabase = createRouteHandlerClient({cookies: () => cookieStore});
  const session = await supabase.auth.getSession();
  if (session.error !== null || session.data.session === null) {
    console.error('No authenticated session exists');
    return unauthorized();
  }

  const email = session.data.session.user.email;
  const appearance = validatedFields.data as Appearance;
  const {error} = await supabase.auth.updateUser({data: {appearance}});
  if (error !== null) {
    console.error('Update appearance request error', {email, error});
    return internalServerError();
  }

  console.info('Update appearance OK', {email, appearance});
  return ok();
}
