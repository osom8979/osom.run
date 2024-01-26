'use client';

import {cloneDeep, isEqual} from 'lodash';
import {useMemo, useState} from 'react';
import styles from './_AppearanceForm.module.scss';
import apiClient from '@/app/api/client';
import RequestButton from '@/app/components/button/RequestButton';
import type {Appearance} from '@/app/libs/auth/metadata';
import useTranslation from '@/app/libs/i18n/client';

const MESSAGE_STATE_HIDDEN = 'hidden';
const MESSAGE_STATE_ERROR = 'error';
const MESSAGE_STATE_SUCCESS = 'success';

interface AppearanceFormProps {
  lng: string;
  appearance: Appearance;
}

export default function AppearanceForm(props: AppearanceFormProps) {
  const original = useMemo(() => {
    return {...props.appearance} as Appearance;
  }, [props.appearance]);
  const [modified, setModified] = useState(cloneDeep(original));
  const [messageState, setMessageState] = useState<string>(MESSAGE_STATE_HIDDEN);
  const [message, setMessage] = useState<undefined | string>();
  const [pending, setPending] = useState<undefined | true>();
  const {t} = useTranslation(props.lng, 'settings-appearance');

  const isDisabledSaveButton = useMemo(() => {
    return pending || isEqual(modified, original);
  }, [original, pending, modified]);

  const handleNicknameChange = (value: string) => {
    setModified(prevState => {
      return {...prevState, nickname: value};
    });
  };

  const handleResetClick = async () => {
    setModified(cloneDeep(original));
    setMessageState(MESSAGE_STATE_HIDDEN);
    setMessage(undefined);
    setPending(undefined);
  };

  const handleSaveClick = async () => {
    setMessageState(MESSAGE_STATE_HIDDEN);
    setMessage(undefined);
    await apiClient.updateAppearance(modified);
  };

  const handleChangePending = async (flag: boolean) => {
    setPending(flag ? true : undefined);
  };

  const handleComplete = async () => {
    setMessageState(MESSAGE_STATE_SUCCESS);
    setMessage(t('save_successful'));
  };

  const handleError = async (message: string) => {
    setMessageState(MESSAGE_STATE_ERROR);
    setMessage(message);
  };

  return (
    <form noValidate={true} className={styles.root}>
      <div className={styles.list}>
        <label className="flex flex-col w-full space-y-1">
          <div className="label pl-0.5 py-0">
            <span className="label-text text-base-content">{t('user.lng.label')}</span>
          </div>
          <input
            type="text"
            className="input input-sm input-bordered w-full"
            disabled={pending}
            aria-disabled={pending}
            value={modified.lng}
            onChange={e => handleNicknameChange(e.currentTarget.value)}
          />
          <div className="label pl-0.5 py-0">
            <span className="label-text-alt text-base-content/70">
              {t('user.lng.detail')}
            </span>
          </div>
        </label>
      </div>

      <hr className={styles.divider} />

      <div className={styles.actions}>
        <p className={styles.info} data-state={messageState}>
          {message}
        </p>

        <div className={styles.buttons}>
          <button
            type="button"
            role="button"
            className="btn btn-xs btn-neutral"
            onClick={handleResetClick}
          >
            <span>{t('reset')}</span>
          </button>

          <RequestButton
            lng={props.lng}
            className="btn btn-xs btn-success"
            disabled={isDisabledSaveButton}
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
    </form>
  );
}
