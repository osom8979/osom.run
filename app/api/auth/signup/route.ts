import 'server-only';

import {createRouteHandlerClient} from '@supabase/auth-helpers-nextjs';
import {StatusCodes} from 'http-status-codes';
import {cookies} from 'next/headers';
import {NextResponse} from 'next/server';
import {LoginSchema} from '@/app/schemas/auth';

export const dynamic = 'force-dynamic';

export interface SignupResponseBody {
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
    return NextResponse.json<SignupResponseBody>(
      {message: validatedFields.error.message},
      {status: StatusCodes.BAD_REQUEST}
    );
  }

  const cookieStore = cookies();
  const supabase = createRouteHandlerClient({cookies: () => cookieStore});
  const {email, password} = validatedFields.data;

  const requestUrl = new URL(request.url);
  const {error} = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: `${requestUrl.origin}/login`,
    },
  });

  if (error !== null) {
    console.error(error.message);
    return NextResponse.json<SignupResponseBody>(
      {message: error.message},
      {status: StatusCodes.INTERNAL_SERVER_ERROR}
    );
  }

  console.info(`Sign up successful with email ${email}`);
  return NextResponse.json<SignupResponseBody>({});
}
