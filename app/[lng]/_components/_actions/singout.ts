'use server';

import {createServerActionClient} from '@supabase/auth-helpers-nextjs';
import {revalidatePath} from 'next/cache';
import {cookies} from 'next/headers';
import {redirect} from 'next/navigation';

export default async function signout(lng: string) {
  const supabase = createServerActionClient({cookies});
  const {error} = await supabase.auth.signOut();
  if (error !== null) {
    return {
      error: error.message,
    };
  }

  revalidatePath('/');
  redirect(`/${lng}/main`);
}
