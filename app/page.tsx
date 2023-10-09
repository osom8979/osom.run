import {redirect} from 'next/navigation';
import {fallbackLng} from '@/app/lib/i18n/settings';

export default async function RootPage() {
  console.assert(false, 'Inaccessible section. Handled by middleware.');
  redirect(`/${fallbackLng}/`);
}
