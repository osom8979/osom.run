'use client';

import {type ChangeEvent, type HTMLAttributes, useMemo} from 'react';

// eslint-disable-next-line no-unused-vars
type OnChange = (event: ChangeEvent<HTMLInputElement>) => void;

interface ToggleProps
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
    | 'value'
    | 'onChange'
  > {
  lng?: string;
  className?: string;
  required?: boolean;
  readOnly?: boolean;
  disabled?: boolean;
  topLabel?: string;
  bottomLabel?: string;
  value?: boolean;
  onChange?: OnChange;
}

export default function Toggle(props: ToggleProps) {
  const {
    lng,
    className,
    required,
    readOnly,
    disabled,
    topLabel,
    bottomLabel,
    value,
    onChange,
    ...attrs
  } = props;

  const inputClassName = useMemo(() => {
    const classes = className?.split(' ').map(v => v.trim()) ?? [];
    if (classes.findIndex(v => v === 'toggle') === -1) {
      classes.push('toggle');
    }
    return classes.join(' ');
  }, [className]);

  return (
    <label className="flex flex-col w-full space-y-1 cursor-pointer">
      <span className="text-sm text-base-content">{topLabel}</span>
      <input
        type="checkbox"
        lang={lng}
        className={inputClassName}
        required={required}
        aria-required={required}
        readOnly={readOnly}
        aria-readonly={readOnly}
        disabled={disabled}
        aria-disabled={disabled}
        checked={value}
        aria-checked={value}
        onChange={onChange}
        {...attrs}
      />
      <span className="text-sm text-base-content">{bottomLabel}</span>
    </label>
  );
}
