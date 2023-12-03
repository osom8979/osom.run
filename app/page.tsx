import {redirect} from 'next/navigation';
import {FALLBACK_LANGUAGE} from '@/app/lib/i18n/settings';

export default async function RootPage() {
  console.assert(false, 'Inaccessible section. Handled by middleware !!');
  redirect(`/${FALLBACK_LANGUAGE}/`);
}
