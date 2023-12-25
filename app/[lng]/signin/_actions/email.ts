'use server';

import {createServerActionClient} from '@supabase/auth-helpers-nextjs';
import {revalidatePath} from 'next/cache';
import {cookies} from 'next/headers';
import {redirect} from 'next/navigation';
import {z} from 'zod';

const schema = z.object({
  email: z.string({
    invalid_type_error: 'Invalid email',
  }),
  password: z.string({
    invalid_type_error: 'Invalid password',
  }),
});

export default async function signinWithEmail(lng: string, formData: FormData) {
  console.debug(`signinWithEmail(lng=${lng},formData=${formData})`);

  const validatedFields = schema.safeParse({
    email: formData.get('email'),
    password: formData.get('password'),
  });

  // Return early if the form data is invalid
  if (!validatedFields.success) {
    console.debug('signinWithEmail -- 2');
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  console.debug('signinWithEmail -- 3');
  const cookieStore = cookies();
  const supabase = createServerActionClient({cookies: () => cookieStore});
  const {email, password} = validatedFields.data;
  console.debug('signinWithEmail -- ', validatedFields.data);
  const {error} = await supabase.auth.signInWithPassword({email, password});
  if (error !== null) {
    console.debug('signinWithEmail -- 4');
    return {
      errors: error.message,
    };
  }

  console.debug('signin-cookieStore: ', cookies().getAll());
  console.debug('signinWithEmail -- 5');
  revalidatePath('/', 'page');
  redirect(`/${lng}/main`);
}
