import 'server-only';

import {createServerComponentClient} from '@supabase/auth-helpers-nextjs';
import {cookies} from 'next/headers';
import {redirect, RedirectType} from 'next/navigation';
import {getAppearance, getProfile} from '@/app/libs/auth/metadata';

export interface CatchSessionIfYouCanOptions {
  lng?: string;
  redirectUrl?: string | URL;
  redirectType?: RedirectType;
}

function getRedirectUrl(options: Omit<CatchSessionIfYouCanOptions, 'redirectType'>) {
  const {lng, redirectUrl} = options;
  if (typeof redirectUrl === 'string') {
    return redirectUrl;
  } else if (redirectUrl instanceof URL) {
    return redirectUrl.toString();
  } else {
    return lng ? `/${lng}` : '/';
  }
}

export async function catchMeIfYouCan(options?: CatchSessionIfYouCanOptions) {
  const {lng, redirectUrl, redirectType} = options ?? {};
  const cookieStore = cookies();
  const supabase = createServerComponentClient({cookies: () => cookieStore});
  const sessionResponse = await supabase.auth.getSession();
  if (sessionResponse.error !== null) {
    redirect(getRedirectUrl({lng, redirectUrl}), redirectType);
  }

  if (sessionResponse.data.session === null) {
    console.warn('Session is null. Force log out.');
    console.debug('In this case, it indicates that the Refresh Token failed.');
    await supabase.auth.signOut();
    redirect(getRedirectUrl({lng}), redirectType);
  }

  const userResponse = await supabase.auth.getUser();
  if (userResponse.error !== null) {
    redirect(getRedirectUrl({lng, redirectUrl}), redirectType);
  }

  const session = sessionResponse.data.session;
  const user = userResponse.data.user;
  const profile = getProfile(user);
  const appearance = getAppearance(user);
  return {supabase, session, user, profile, appearance};
}
