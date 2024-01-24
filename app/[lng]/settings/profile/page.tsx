import {createServerComponentClient} from '@supabase/auth-helpers-nextjs';
import {cookies} from 'next/headers';
import {type I18nRouterProps} from '@/app/[lng]/params';
import {type Database} from '@/app/api/supabase';
import PreferenceLayout from '@/app/components/PreferenceLayout';
import useTranslation from '@/app/libs/i18n/server';

export default async function SettingsProfilePage(props: I18nRouterProps) {
  const lng = props.params.lng;
  const {t} = await useTranslation(lng, 'settings-profile');
  const cookieStore = cookies();
  const supabase = createServerComponentClient<Database>({cookies: () => cookieStore});
  const result = await supabase.from('profiles').select('nickname, time_zone');
  console.debug(result);

  return (
    <section className="pt-4 sm:pt-0 pr-4">
      <div className="space-y-0.5 pl-0.5">
        <h2 className="font-medium text-2xl text-neutral-content">{t('title')}</h2>
      </div>

      <div className="divider my-2" />

      <PreferenceLayout
        leftTitle={<p>{t('user.title')}</p>}
        leftSubtitle={<p>{t('user.subtitle')}</p>}
      >
        <div className="osom-card card-compact">
          <div className="card-body space-y-4">
            <label className="flex flex-col w-full">
              <div className="label">
                <span className="label-text">{t('user.nickname.label')}</span>
              </div>
              <input type="text" className="input input-sm input-bordered w-full" />
              <div className="label">
                <span className="label-text-alt">{t('user.nickname.details')}</span>
              </div>
            </label>
          </div>
        </div>
      </PreferenceLayout>
    </section>
  );
}
