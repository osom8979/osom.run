'use client';

import {cloneDeep, isEqual} from 'lodash';
import {useMemo, useState} from 'react';
import styles from './_ProfileForm.module.scss';
import apiClient from '@/app/api/client';
import RequestButton from '@/app/components/button/RequestButton';
import type {Profile} from '@/app/libs/auth/metadata';
import useTranslation from '@/app/libs/i18n/client';

interface ProfileFormProps {
  lng: string;
  profile: Profile;
}

export default function ProfileForm(props: ProfileFormProps) {
  const [error, setError] = useState<undefined | string>();
  const [complete, setComplete] = useState<undefined | string>();
  const [pending, setPending] = useState<undefined | true>();
  const {t} = useTranslation(props.lng, 'settings-profile');

  const original = useMemo(() => {
    return {nickname: '', ...props.profile} as Required<Profile>;
  }, [props.profile]);
  const [modified, setModified] = useState(cloneDeep(original));

  const isDisabled = useMemo(() => {
    return pending || isEqual(modified, original);
  }, [original, pending, modified]);

  const handleNicknameChange = (value: string) => {
    setModified(prevState => {
      return {...prevState, nickname: value};
    });
  };

  const handleResetClick = async () => {
    setPending(true);
    try {
      setModified(cloneDeep(original));
    } finally {
      setPending(undefined);
    }
  };

  const handleSaveClick = async () => {
    setError(undefined);
    setComplete(undefined);

    console.debug(modified);
    await apiClient.updateUserMetadata(modified);
  };

  const handleChangePending = async (pendingFlag: boolean) => {
    setPending(pendingFlag ? true : undefined);
  };

  const handleComplete = async () => {
    setError(undefined);
    setComplete(t('save_successful'));
  };

  const handleError = async (errorMessage: string) => {
    setError(errorMessage);
    setComplete(undefined);
  };

  return (
    <div className={styles.root}>
      <div className={styles.list}>
        <label className="flex flex-col w-full space-y-1">
          <div className="label pl-0.5 py-0">
            <span className="label-text text-base-content">
              {t('user.nickname.label')}
            </span>
          </div>
          <input
            type="text"
            className="input input-sm input-bordered w-full"
            disabled={pending}
            aria-disabled={pending}
            value={modified.nickname}
            onChange={e => handleNicknameChange(e.currentTarget.value)}
          />
          <div className="label pl-0.5 py-0">
            <span className="label-text-alt text-base-content/70">
              {t('user.nickname.detail')}
            </span>
          </div>
        </label>
      </div>

      <hr className={styles.divider} />

      <div className={styles.actions}>
        <p
          className={styles.info}
          data-success={complete}
          data-error={error}
          aria-errormessage={error}
        >
          {error}
          {complete}
        </p>

        <div className="join join-horizontal">
          <button
            type="button"
            role="button"
            className="join-item btn btn-xs btn-neutral w-20"
            onClick={handleResetClick}
          >
            <span>{t('reset')}</span>
          </button>

          <RequestButton
            lng={props.lng}
            className="join-item btn btn-xs btn-success w-20"
            disabled={isDisabled}
            noErrorFeedback={true}
            recoverPendingState={true}
            onClick={handleSaveClick}
            onChangePending={handleChangePending}
            onComplete={handleComplete}
            onError={handleError}
          >
            <p>{t('save')}</p>
          </RequestButton>
        </div>
      </div>
    </div>
  );
}
