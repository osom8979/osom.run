import {createServerComponentClient} from '@supabase/auth-helpers-nextjs';
import {cookies} from 'next/headers';
import {redirect} from 'next/navigation';
import type {I18nRouterProps} from '@/app/[lng]/params';
import type {Database} from '@/app/api/supabase';
import PreferenceLayout from '@/app/components/layout/PreferenceLayout';
import useTranslation from '@/app/libs/i18n/server';

export default async function SettingsProfilePage(props: I18nRouterProps) {
  const lng = props.params.lng;
  const {t} = await useTranslation(lng, 'settings-profile');
  const cookieStore = cookies();
  const supabase = createServerComponentClient<Database>({cookies: () => cookieStore});
  const userResponse = await supabase.auth.getUser();
  const hasSession = userResponse.error === null;
  if (!hasSession) {
    redirect(`/${lng}`);
  }

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
            <label className="flex flex-col w-full space-y-1">
              <div className="label pl-0.5 py-0">
                <span className="label-text text-neutral-content">
                  {t('user.nickname.label')}
                </span>
              </div>
              <input type="text" className="input input-sm input-bordered w-full" />
              <div className="label pl-0.5 py-0">
                <span className="label-text-alt text-neutral-content/70">
                  {t('user.nickname.details')}
                </span>
              </div>
            </label>
          </div>

          <div className="divider h-[1px] before:h-[1px] after:h-[1px] m-0" />

          <div className="card-body space-y-4">
            <div className="card-actions justify-end">
              <div className="join join-horizontal">
                <button type="button" className="join-item btn btn-sm">
                  <span>Reset</span>
                </button>
                <button type="button" className="join-item btn btn-sm btn-success">
                  <span>Save</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </PreferenceLayout>
    </section>
  );
}
