import {dir} from 'i18next';
import {type I18nLayoutProps} from '@/app/[lng]/params';
import {LANGUAGES} from '@/app/lib/i18n/settings';

export async function generateStaticParams() {
  return LANGUAGES.map(lng => ({lng}));
}

export default async function LngLayout(props: I18nLayoutProps) {
  return (
    <html lang={props.params.lng} dir={dir(props.params.lng)}>
      <body>{props.children}</body>
    </html>
  );
}
