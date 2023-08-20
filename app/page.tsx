import {redirect} from 'next/navigation';
import {fallbackLng} from '@/app/i18n/settings';

export default async function RootPage() {
  redirect(`/${fallbackLng}/`);
}
