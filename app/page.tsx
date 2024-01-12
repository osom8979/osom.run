import {redirect} from 'next/navigation';
import {FALLBACK_LANGUAGE} from '@/app/libs/i18n/settings';

export default async function RootPage() {
  redirect(`/${FALLBACK_LANGUAGE}/`);
}
