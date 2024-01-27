'use client';

import {ChangeEvent, type HTMLAttributes, type PropsWithChildren, useMemo} from 'react';

// eslint-disable-next-line no-unused-vars
type OnChange = (event: ChangeEvent<HTMLSelectElement>) => void | Promise<void>;

export interface SelectOptions {
  key: number | string;
  value: number | string;
  label?: string;
  disabled?: boolean;
  selected?: boolean;
}

interface SelectProps
  extends Omit<
    PropsWithChildren<HTMLAttributes<HTMLSelectElement>>,
    | 'lang'
    | 'className'
    | 'required'
    | 'aria-required'
    | 'disabled'
    | 'aria-disabled'
    | 'value'
    | 'onChange'
  > {
  lng?: string;
  className?: string;
  required?: boolean;
  disabled?: boolean;
  topLabel?: string;
  bottomLabel?: string;
  options?: Array<SelectOptions>;
  value?: string;
  onChange?: OnChange;
}

export default function Select(props: SelectProps) {
  const {
    lng,
    className,
    required,
    disabled,
    topLabel,
    bottomLabel,
    options,
    value,
    onChange,
    ...attrs
  } = props;

  const inputClassName = useMemo(() => {
    const classes = className?.split(' ').map(v => v.trim()) ?? [];
    if (classes.findIndex(v => v === 'select') === -1) {
      classes.push('select');
    }
    return classes.join(' ');
  }, [className]);

  return (
    <label className="flex flex-col w-full space-y-1">
      <div className="label pl-0.5 py-0">
        <p className="label-text text-base-content">{topLabel}</p>
      </div>
      <select
        lang={lng}
        className={inputClassName}
        required={required}
        aria-required={required}
        disabled={disabled}
        aria-disabled={disabled}
        value={value}
        onChange={onChange}
        {...attrs}
      >
        {options &&
          options.map(o => {
            return (
              <option
                key={o.value}
                value={o.value}
                label={o.label}
                aria-label={o.label}
                disabled={o.disabled}
                aria-disabled={o.disabled}
                selected={o.selected}
                aria-selected={o.selected}
              >
                {o.label}
              </option>
            );
          })}
      </select>
      <div className="label pl-0.5 py-0">
        <p className="label-text-alt text-base-content/70">{bottomLabel}</p>
      </div>
    </label>
  );
}
