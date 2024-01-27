'use client';

import type {UserIdentity} from '@supabase/gotrue-js';
import {DateTime} from 'luxon';
import {type ReactNode, useCallback, useMemo} from 'react';
import RequestButton from '@/app/components/button/RequestButton';
import CiLinkHorizontal from '@/app/icons/ci/CiLinkHorizontal';
import CiLinkHorizontalOff from '@/app/icons/ci/CiLinkHorizontalOff';
import MdiDiscord from '@/app/icons/mdi/MdiDiscord';
import MdiGithub from '@/app/icons/mdi/MdiGithub';
import MdiGoogle from '@/app/icons/mdi/MdiGoogle';
import type {Profile} from '@/app/libs/auth/metadata';
import useTranslation from '@/app/libs/i18n/client';

interface ConnectionItem {
  key: string;
  icon: ReactNode;
  label: string;
  datetime?: string;
}

interface ConnectionFormProps {
  lng: string;

  readonly profile: Profile;
  readonly identities?: Array<UserIdentity>;
}

export default function ConnectionForm(props: ConnectionFormProps) {
  const {t} = useTranslation(props.lng, 'settings-connection');

  const getCreatedAt = useCallback(
    (provider: string) => {
      const identities = props.identities ?? [];
      const index = identities.findIndex(x => x.provider === provider);
      if (index === -1) {
        return undefined;
      }

      const createdAt = identities[index].created_at;
      if (!createdAt) {
        return undefined;
      }

      const isoCreatedAt = DateTime.fromISO(createdAt)
        .setLocale(props.profile.lng)
        .setZone(props.profile.timezone)
        .toLocaleString(DateTime.DATE_FULL);
      return isoCreatedAt || undefined;
    },
    [props.identities, props.profile]
  );

  const fields = useMemo(() => {
    return [
      {
        key: 'google',
        icon: <MdiGoogle className="w-7 h-7" />,
        label: t('oauth.google'),
        datetime: getCreatedAt('google'),
      },
      {
        key: 'github',
        icon: <MdiGithub className="w-7 h-7" />,
        label: t('oauth.github'),
        datetime: getCreatedAt('github'),
      },
      {
        key: 'discord',
        icon: <MdiDiscord className="w-7 h-7" />,
        label: t('oauth.discord'),
        datetime: getCreatedAt('discord'),
      },
    ] as Array<ConnectionItem>;
  }, [t, getCreatedAt]);

  const handleUnlink = async (item: ConnectionItem) => {
    console.assert(item);
  };

  const handleLink = async (item: ConnectionItem) => {
    console.assert(item);
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
                      <RequestButton
                        lng={props.lng}
                        className="btn btn-sm btn-accent btn-outline w-full"
                        onClick={() => handleUnlink(field)}
                      >
                        <CiLinkHorizontalOff className="w-6 h-6" />
                        <p>{t('unlink')}</p>
                      </RequestButton>
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
