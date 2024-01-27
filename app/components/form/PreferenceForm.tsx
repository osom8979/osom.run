'use client';

import {cloneDeep, isEqual} from 'lodash';
import {useMemo, useState} from 'react';
import styles from './PreferenceForm.module.scss';
import RequestButton from '@/app/components/button/RequestButton';
import TextInput from '@/app/components/input/TextInput';

const MESSAGE_STATE_HIDDEN = 'hidden';
const MESSAGE_STATE_ERROR = 'error';
const MESSAGE_STATE_SUCCESS = 'success';

// eslint-disable-next-line no-unused-vars
type OnClick = (data: Record<string, any>) => Promise<void>;

type PreferenceFieldType = 'text' | 'select';

export interface ChoiceItem {
  value: number | string;
  label?: string;
}

export interface PreferenceField {
  key: string;
  type: PreferenceFieldType;
  label?: string;
  detail?: string;
  select?: Array<ChoiceItem>;
}

interface PreferenceFormProps {
  lng: string;
  items: Record<string, any>;
  fields: Array<PreferenceField>;
  onClick?: OnClick;
  successLabel?: string;
  resetLabel?: string;
  saveLabel?: string;
}

export default function PreferenceForm(props: PreferenceFormProps) {
  const original = useMemo(() => {
    return {...props.items};
  }, [props.items]);
  const [modified, setModified] = useState(cloneDeep(original));
  const [messageState, setMessageState] = useState<string>(MESSAGE_STATE_HIDDEN);
  const [message, setMessage] = useState<undefined | string>();
  const [pending, setPending] = useState<undefined | true>();

  const isDisabledSaveButton = useMemo(() => {
    return pending || isEqual(modified, original);
  }, [original, pending, modified]);

  const handleChange = (key: string, value: string) => {
    setModified(prevState => {
      return {...prevState, [key]: value};
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
    if (props.onClick) {
      await props.onClick(modified);
    }
  };

  const handleChangePending = async (flag: boolean) => {
    setPending(flag ? true : undefined);
  };

  const handleComplete = async () => {
    setMessageState(MESSAGE_STATE_SUCCESS);
    setMessage(props.successLabel);
  };

  const handleError = async (message: string) => {
    setMessageState(MESSAGE_STATE_ERROR);
    setMessage(message);
  };

  return (
    <form noValidate={true} className={styles.root}>
      <div className={styles.list}>
        {props.fields.map(field => {
          switch (field.type) {
            case 'text':
              return (
                <div key={field.key} className={styles.item}>
                  <TextInput
                    className="input input-sm input-bordered w-full"
                    disabled={pending}
                    topLabel={field.label}
                    bottomLabel={field.detail}
                    value={modified[field.key]}
                    onChange={e => handleChange(field.key, e.currentTarget.value)}
                  />
                </div>
              );
            case 'select':
              return (
                <div key={field.key} className={styles.item}>
                  <div className="label pl-0.5 py-0">
                    <p className="label-text text-base-content">{field.label}</p>
                  </div>
                  <select className="select select-sm select-bordered w-full">
                    {field.select &&
                      field.select.map(c => {
                        return (
                          <option key={c.value} value={c.value}>
                            {c.label}
                          </option>
                        );
                      })}
                  </select>
                  <div className="label pl-0.5 py-0">
                    <p className="label-text-alt text-base-content/70">
                      {field.detail}
                    </p>
                  </div>
                </div>
              );
            default:
              console.error('Unknown preference field type:', field.type);
              return <div hidden />;
          }
        })}
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
            <p>{props.resetLabel}</p>
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
            <p>{props.saveLabel}</p>
          </RequestButton>
        </div>
      </div>
    </form>
  );
}
