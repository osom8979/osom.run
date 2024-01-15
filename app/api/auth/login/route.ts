import 'server-only';

import {createRouteHandlerClient} from '@supabase/auth-helpers-nextjs';
import {StatusCodes} from 'http-status-codes';
import {cookies} from 'next/headers';
import {NextResponse} from 'next/server';
import {LoginSchema} from '@/app/schemas/auth';

export const dynamic = 'force-dynamic';

export interface LoginResponseBody {
  message?: string;
}

export async function POST(request: Request) {
  const formData = await request.formData();
  const validatedFields = LoginSchema.safeParse({
    email: formData.get('email'),
    password: formData.get('password'),
  });

  // Return early if the form data is invalid
  if (!validatedFields.success) {
    console.debug(validatedFields.error.message);
    return NextResponse.json<LoginResponseBody>(
      {message: validatedFields.error.message},
      {status: StatusCodes.BAD_REQUEST}
    );
  }

  const cookieStore = cookies();
  const supabase = createRouteHandlerClient({cookies: () => cookieStore});
  const {email, password} = validatedFields.data;
  const signInResult = await supabase.auth.signInWithPassword({email, password});
  const {error} = signInResult;

  if (error !== null) {
    console.debug(error.message);
    return NextResponse.json<LoginResponseBody>(
      {message: error.message},
      {status: StatusCodes.UNAUTHORIZED}
    );
  }

  console.info(`Login successful with email ${email}`);
  return NextResponse.json<LoginResponseBody>({});
}
