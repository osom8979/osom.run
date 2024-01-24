import {createServerComponentClient} from '@supabase/auth-helpers-nextjs';
import {cookies} from 'next/headers';
import {type I18nRouterProps} from '@/app/[lng]/params';
import {type Database} from '@/app/api/supabase';
import useTranslation from '@/app/libs/i18n/server';

export default async function SettingsProfilePage(props: I18nRouterProps) {
  const lng = props.params.lng;
  const {t} = await useTranslation(lng, 'settings-profile');
  const cookieStore = cookies();
  const supabase = createServerComponentClient<Database>({cookies: () => cookieStore});
  const result = await supabase.from('profiles').select('nickname, time_zone');
  console.debug(result);

  return (
    <section>
      <h2>{t('title')}</h2>

      <div className="divider" />

      <article className="flex flex-row justify-between">
        <p>{t('subtitle')}</p>
        <div className="flex items-center">
          <p>Content</p>
        </div>
      </article>
    </section>
  );
}
