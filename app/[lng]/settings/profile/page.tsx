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
      <h2 className="text-sm">{t('title')}</h2>

      <div className="divider m-0" />

      <div className="flex flex-row justify-between">
        <div className="flex flex-col">
          <h3 className="text-lg text-base-content">{t('title')}</h3>
          <p className="font-light text-sm text-base-content">{t('subtitle')}</p>
        </div>
        <div className="flex items-center">
          <p>Content</p>
        </div>
      </div>
    </section>
  );
}
