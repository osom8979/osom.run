'use client';

import _ from 'lodash';
import {useMemo, useState} from 'react';
import styles from './PreferenceForm.module.scss';
import RequestButton from '@/app/components/button/RequestButton';
import PreferenceLayout from '@/app/components/layout/PreferenceLayout';

// eslint-disable-next-line no-unused-vars
type OnChange = (key: string, value: any) => void;

// eslint-disable-next-line no-unused-vars
type OnSubmit = (modified: Record<string, any>) => Promise<void>;

export type PreferenceFieldType =
  | 'check'
  | 'null'
  | 'radio'
  | 'range'
  | 'select'
  | 'text';

export interface PreferenceField {
  key: string;
  type?: PreferenceFieldType;
  label?: string;
  detail?: string;
  choice?: Array<any>;
  min?: number;
  max?: number;
}

const VALUE_TO_FIELD_TYPE = {
  undefined: 'null',
  string: 'text',
  boolean: 'check',
  number: 'range',
  object: 'null',
  bigint: 'range',
  function: 'null',
  symbol: 'null',
} as Record<string, PreferenceFieldType>;

function inferenceFieldTypeWithValue(value?: any): PreferenceFieldType {
  try {
    return VALUE_TO_FIELD_TYPE[typeof value];
  } catch {
    return 'null';
  }
}

interface FieldProps extends PreferenceField {
  pending?: true;
  value?: any;
  onChange?: OnChange;
}

function CheckField(props: FieldProps) {
  console.assert(props);
  return <div hidden={true} />;
}

function RadioField(props: FieldProps) {
  console.assert(props);
  return <div hidden={true} />;
}

function RangeField(props: FieldProps) {
  console.assert(props);
  return <div hidden={true} />;
}

function SelectField(props: FieldProps) {
  console.assert(props);
  return <div hidden={true} />;
}

function TextField(props: FieldProps) {
  return (
    <label className="flex flex-col w-full space-y-1">
      <div className="label pl-0.5 py-0">
        <span className="label-text text-base-content">{props.label}</span>
      </div>
      <input type="text" className="input input-sm input-bordered w-full" />
      <div className="label pl-0.5 py-0">
        <span className="label-text-alt text-base-content/70">{props.detail}</span>
      </div>
    </label>
  );
}

function NullField() {
  return <div hidden={true} />;
}

function Field(props: FieldProps) {
  const fieldType = props.type ?? inferenceFieldTypeWithValue(props.value);
  console.debug('fieldType -> ', fieldType);
  switch (fieldType) {
    case 'check':
      return <CheckField {...props} />;
    case 'radio':
      return <RadioField {...props} />;
    case 'range':
      return <RangeField {...props} />;
    case 'select':
      return <SelectField {...props} />;
    case 'text':
      return <TextField {...props} />;
    default:
      return <NullField />;
  }
}

interface PreferenceFormProps {
  lng: string;
  titleLabel?: string;
  subtitleLabel?: string;
  resetLabel?: string;
  saveLabel?: string;
  items?: Record<string, any>;
  fields?: Array<PreferenceField>;
  onSubmit?: OnSubmit;
}

export default function PreferenceForm(props: PreferenceFormProps) {
  const {
    lng,
    titleLabel,
    subtitleLabel,
    resetLabel,
    saveLabel,
    items,
    fields,
    onSubmit,
  } = props;
  const [modified, setModified] = useState(_.cloneDeep(items ?? {}));
  const [pending, setPending] = useState<undefined | true>();
  const [error, setError] = useState<undefined | string>();

  const isDisabled = useMemo(() => {
    return pending || _.isEqual(items, modified);
  }, [pending, modified, items]);

  const handleChangeFieldValue = (key: string, value: any) => {
    setModified({...modified, [key]: value});
  };

  const handleSaveClick = async () => {
    if (onSubmit) {
      await onSubmit(modified);
    }
  };

  const handleChangePending = async (pendingFlag: boolean) => {
    setPending(pendingFlag ? true : undefined);
  };

  const handleError = async (errorMessage: string) => {
    setError(errorMessage);
  };

  return (
    <PreferenceLayout
      className={styles.root}
      leftTitle={<p>{titleLabel}</p>}
      leftSubtitle={<p>{subtitleLabel}</p>}
    >
      <div className={styles.main}>
        <div className={styles.body}>
          {fields &&
            fields.map(f => (
              <Field
                key={f.key}
                type={f.type}
                label={f.label}
                detail={f.detail}
                choice={f.choice}
                min={f.min}
                max={f.max}
                pending={pending}
                value={modified[f.key]}
                onChange={handleChangeFieldValue}
              />
            ))}
        </div>

        <hr className={styles.line} />

        <div className={styles.body}>
          <div className={styles.actions}>
            <p className={styles.error} data-error={error} aria-errormessage={error}>
              {error}
            </p>

            <div className="join join-horizontal">
              <button type="button" role="button" className="join-item btn btn-sm">
                <p>{resetLabel}</p>
              </button>
              <RequestButton
                lng={lng}
                className="join-item btn btn-sm btn-success"
                disabled={isDisabled}
                noRefresh={true}
                noErrorFeedback={true}
                onClick={handleSaveClick}
                onChangePending={handleChangePending}
                onError={handleError}
              >
                <p>{saveLabel}</p>
              </RequestButton>
            </div>
          </div>
        </div>
      </div>
    </PreferenceLayout>
  );
}
