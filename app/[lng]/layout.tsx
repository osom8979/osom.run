import {dir} from 'i18next';
import {ReactNode} from 'react';
import {LANGUAGES} from '@/app/lib/i18n/settings';

export async function generateStaticParams() {
  return LANGUAGES.map(lng => ({lng}));
}

export default function LngLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: {lng: string};
}) {
  return (
    <html lang={params.lng} dir={dir(params.lng)}>
      <body>{children}</body>
    </html>
  );
}
