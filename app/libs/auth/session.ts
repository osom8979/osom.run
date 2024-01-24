import 'server-only';

import {createServerComponentClient} from '@supabase/auth-helpers-nextjs';
import {cookies} from 'next/headers';
import {redirect, RedirectType} from 'next/navigation';

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

export async function catchSessionIfYouCan(options?: CatchSessionIfYouCanOptions) {
  const {lng, redirectUrl, redirectType} = options ?? {};
  const cookieStore = cookies();
  const supabase = createServerComponentClient({cookies: () => cookieStore});
  const session = await supabase.auth.getSession();
  const hasSession = session.error === null;
  if (!hasSession) {
    redirect(getRedirectUrl({lng, redirectUrl}), redirectType);
  }
}
