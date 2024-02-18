'use client';

import {createClientComponentClient} from '@supabase/auth-helpers-nextjs';
import type {UserIdentity} from '@supabase/gotrue-js';
import {DateTime} from 'luxon';
import {useRouter} from 'next/navigation';
import {Fragment, type ReactNode, useMemo} from 'react';
import ModalButton from '@/app/components/button/ModalButton';
import RequestButton from '@/app/components/button/RequestButton';
import {UnsupportedError} from '@/app/exceptions';
import CiLinkHorizontal from '@/app/icons/ci/CiLinkHorizontal';
import CiLinkHorizontalOff from '@/app/icons/ci/CiLinkHorizontalOff';
import MdiDiscord from '@/app/icons/mdi/MdiDiscord';
import MdiGithub from '@/app/icons/mdi/MdiGithub';
import MdiGoogle from '@/app/icons/mdi/MdiGoogle';
import TablerAlertCircle from '@/app/icons/tabler/TablerAlertCircle';
import useTranslation from '@/app/libs/i18n/client';
import type {Profile} from '@/app/libs/supabase/metadata';

interface ConnectionItem {
  key: string;
  icon: ReactNode;
  label: string;
  datetime?: string;
  identity?: UserIdentity;
}

interface ConnectionFormProps {
  lng: string;

  readonly profile: Profile;
  readonly identities?: Array<UserIdentity>;
}

export default function ConnectionForm(props: ConnectionFormProps) {
  const {t} = useTranslation(props.lng, 'settings-connection');
  const router = useRouter();
  const supabase = createClientComponentClient();

  const createdAt = useMemo(() => {
    const result = {} as Record<string, string>;
    const identities = props.identities ?? [];
    identities.forEach(identity => {
      const provider = identity.provider;
      const createdAt = identity.created_at;
      if (!createdAt) {
        return;
      }
      result[provider] = DateTime.fromISO(createdAt)
        .setLocale(props.profile.lng)
        .setZone(props.profile.timezone)
        .toLocaleString(DateTime.DATE_FULL);
    });
    return result;
  }, [props.profile, props.identities]);

  const fields = useMemo(() => {
    return [
      {
        key: 'google',
        icon: <MdiGoogle className="w-7 h-7" />,
        label: t('oauth.google'),
        datetime: createdAt['google'],
        identity: props.identities?.find(i => i.provider === 'google'),
      },
      {
        key: 'github',
        icon: <MdiGithub className="w-7 h-7" />,
        label: t('oauth.github'),
        datetime: createdAt['github'],
        identity: props.identities?.find(i => i.provider === 'github'),
      },
      {
        key: 'discord',
        icon: <MdiDiscord className="w-7 h-7" />,
        label: t('oauth.discord'),
        datetime: createdAt['discord'],
        identity: props.identities?.find(i => i.provider === 'discord'),
      },
    ] as Array<ConnectionItem>;
  }, [props.identities, t, createdAt]);

  const handleUnlink = async (item: ConnectionItem) => {
    if (!item.identity) {
      throw new Error('Not found identity property');
    }
    const {error} = await supabase.auth.unlinkIdentity(item.identity);
    if (error !== null) {
      throw error;
    }
    router.refresh();
  };

  const handleLink = async (item: ConnectionItem) => {
    console.assert(item);
    throw new UnsupportedError();
  };

  return (
    <div className="bg-base-200 border-[1px] border-base-content/30 rounded shadow">
      <div className="flex flex-col">
        {fields &&
          fields.map((field, index) => {
            return (
              <div key={field.key}>
                {index >= 1 && <hr className="border-t border-base-content/30" />}

                <div className="flex flex-row justify-between w-full p-4">
                  <div className="flex flex-row items-center space-x-4">
                    {field.icon}

                    <div className="flex flex-col justify-center space-y-0.5">
                      <p className="font-medium text-sm  text-base-content">
                        {field.label}
                      </p>

                      {field.datetime && (
                        <p className="font-light text-xs text-base-content/70">
                          {t('created', {datetime: field.datetime})}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="flex flex-row items-center w-36">
                    {field.datetime ? (
                      <ModalButton
                        className="btn btn-sm btn-error btn-outline w-full sm:w-36"
                        label={
                          <Fragment>
                            <CiLinkHorizontalOff className="w-6 h-6" />
                            <p>{t('unlink')}</p>
                          </Fragment>
                        }
                        icon={<TablerAlertCircle className="w-12 h-12 text-accent" />}
                        title={t('unlink_confirm.title')}
                        detail={t('unlink_confirm.detail')}
                      >
                        <RequestButton
                          lng={props.lng}
                          className="btn btn-sm btn-accent btn-outline min-w-[12rem]"
                          onClick={() => handleUnlink(field)}
                        >
                          <p>{t('unlink_confirm.ok')}</p>
                        </RequestButton>
                      </ModalButton>
                    ) : (
                      <div
                        className="tooltip tooltip-accent w-full"
                        data-tip={t('errors.unsupported_manual_link')}
                      >
                        <RequestButton
                          className="btn btn-sm btn-primary btn-outline btn-disabled w-full"
                          disabled={true}
                          onClick={() => handleLink(field)}
                        >
                          <CiLinkHorizontal className="w-6 h-6" />
                          <p>{t('link')}</p>
                        </RequestButton>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
}
