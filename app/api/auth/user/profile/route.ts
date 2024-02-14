import 'server-only';

import {createRouteHandlerClient} from '@supabase/auth-helpers-nextjs';
import {cookies} from 'next/headers';
import {NextRequest} from 'next/server';
import {badRequest, internalServerError, ok, unauthorized} from '@/app/api/response';
import type {Profile} from '@/app/libs/supabase/metadata';
import {ProfileSchema} from '@/app/libs/zod/settings';

export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
  const formData = await request.formData();
  const validatedFields = ProfileSchema.safeParse({
    nickname: formData.get('nickname'),
    timezone: formData.get('timezone'),
    lng: formData.get('lng'),
  });

  if (!validatedFields.success) {
    console.error(validatedFields.error);
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
  const profile = validatedFields.data as Profile;
  const {error} = await supabase.auth.updateUser({data: {profile}});
  if (error !== null) {
    console.error('Update profile request error', {email, error});
    return internalServerError();
  }

  console.info('Update profile OK', {email, profile});
  return ok();
}
