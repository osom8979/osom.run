'use client';

import {type ChangeEvent, type HTMLAttributes, useMemo} from 'react';

// eslint-disable-next-line no-unused-vars
type OnChange = (event: ChangeEvent<HTMLInputElement>) => void;

interface TextInputProps
  extends Omit<
    HTMLAttributes<HTMLInputElement>,
    | 'type'
    | 'lang'
    | 'className'
    | 'required'
    | 'aria-required'
    | 'readOnly'
    | 'aria-readonly'
    | 'disabled'
    | 'aria-disabled'
    | 'placeholder'
    | 'aria-placeholder'
    | 'value'
    | 'onChange'
  > {
  lng?: string;
  className?: string;
  required?: boolean;
  readOnly?: boolean;
  disabled?: boolean;
  placeholder?: string;
  topLabel?: string;
  bottomLabel?: string;
  value?: string;
  onChange?: OnChange;
}

export default function TextInput(props: TextInputProps) {
  const {
    lng,
    className,
    required,
    readOnly,
    disabled,
    placeholder,
    topLabel,
    bottomLabel,
    value,
    onChange,
    ...attrs
  } = props;

  const inputClassName = useMemo(() => {
    const classes = className?.split(' ').map(v => v.trim()) ?? [];
    if (classes.findIndex(v => v === 'input') === -1) {
      classes.push('input');
    }
    return classes.join(' ');
  }, [className]);

  return (
    <label className="flex flex-col w-full space-y-1">
      <div className="label pl-0.5 py-0">
        <p className="label-text text-base-content">{topLabel}</p>
      </div>
      <input
        type="text"
        lang={lng}
        className={inputClassName}
        required={required}
        aria-required={required}
        readOnly={readOnly}
        aria-readonly={readOnly}
        disabled={disabled}
        aria-disabled={disabled}
        placeholder={placeholder}
        aria-placeholder={placeholder}
        value={value}
        onChange={onChange}
        {...attrs}
      />
      <div className="label pl-0.5 py-0">
        <p className="label-text-alt text-base-content/70">{bottomLabel}</p>
      </div>
    </label>
  );
}
