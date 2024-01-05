import 'server-only';

import {createRouteHandlerClient} from '@supabase/auth-helpers-nextjs';
import {cookies} from 'next/headers';
import {NextResponse} from 'next/server';
import {z} from 'zod';

export const dynamic = 'force-dynamic';

const schema = z.object({
  email: z.string({invalid_type_error: 'Invalid email'}).email(),
  password: z.string({invalid_type_error: 'Invalid password'}),
});

export async function POST(request: Request) {
  const formData = await request.formData();
  console.debug('[POST] /api/auth/login', formData);

  const validatedFields = schema.safeParse({
    email: formData.get('email'),
    password: formData.get('password'),
  });

  // Return early if the form data is invalid
  if (!validatedFields.success) {
    return NextResponse.json({message: validatedFields.error.message}, {status: 500});
  }

  const cookieStore = cookies();
  const supabase = createRouteHandlerClient({cookies: () => cookieStore});
  const {email, password} = validatedFields.data;
  const signInResult = await supabase.auth.signInWithPassword({email, password});
  const {error} = signInResult;

  if (error !== null) {
    return NextResponse.json({message: error.message}, {status: 500});
  }

  return NextResponse.json({});
}
