'use client';

import {cloneDeep, isEqual} from 'lodash';
import {useMemo, useState} from 'react';
import styles from './PreferenceForm.module.scss';
import RequestButton from '@/app/components/button/RequestButton';
import Radio, {type RadioOptions} from '@/app/components/input/Radio';
import Select, {type SelectOptions} from '@/app/components/input/Select';
import TextInput from '@/app/components/input/TextInput';
import Toggle from '@/app/components/input/Toggle';

const MESSAGE_STATE_HIDDEN = 'hidden';
const MESSAGE_STATE_ERROR = 'error';
const MESSAGE_STATE_SUCCESS = 'success';

// eslint-disable-next-line no-unused-vars
type OnClick = (data: Record<string, any>) => Promise<void>;

interface PreferenceFieldCommon {
  key: string;
  label?: string;
  detail?: string;
}

type PreferenceFieldSpecialize =
  | {
      type: 'text';
    }
  | {
      type: 'select';
      options?: Array<SelectOptions>;
    }
  | {
      type: 'radio';
      options?: Array<RadioOptions>;
    }
  | {
      type: 'toggle';
      offLabel?: string;
      onLabel?: string;
    };

export type PreferenceField = PreferenceFieldCommon & PreferenceFieldSpecialize;

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

  const handleChange = (key: string, value: boolean | number | string) => {
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
                    lng={props.lng}
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
                  <Select
                    lng={props.lng}
                    className="select select-sm select-bordered w-full"
                    disabled={pending}
                    topLabel={field.label}
                    bottomLabel={field.detail}
                    options={field.options}
                    value={modified[field.key]}
                    onChange={e => handleChange(field.key, e.currentTarget.value)}
                  />
                </div>
              );
            case 'radio':
              return (
                <div key={field.key} className={styles.item}>
                  <Radio
                    lng={props.lng}
                    name={field.key}
                    className="radio radio-xs w-full"
                    topLabel={field.label}
                    bottomLabel={field.detail}
                    options={field.options}
                    value={modified[field.key]}
                    onChange={e => {
                      if (e.currentTarget.checked) {
                        handleChange(field.key, e.currentTarget.value);
                      }
                    }}
                  />
                </div>
              );
            case 'toggle':
              return (
                <div key={field.key} className={styles.item}>
                  <Toggle
                    lng={props.lng}
                    className="toggle toggle-sm w-full"
                    topLabel={field.label}
                    bottomLabel={field.detail}
                    leftLabel={field.offLabel}
                    rightLabel={field.onLabel}
                    value={modified[field.key]}
                    onChange={e => handleChange(field.key, e.currentTarget.checked)}
                  />
                </div>
              );
            default:
              console.error('Unknown preference field type');
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
