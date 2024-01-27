'use client';

import {type ChangeEvent, useMemo} from 'react';

// eslint-disable-next-line no-unused-vars
type OnChange = (event: ChangeEvent<HTMLInputElement>) => void;

export interface RadioOptions {
  value: number | string;
  label?: string;
  disabled?: boolean;
}

interface RadioProps {
  name: string;
  lng?: string;
  className?: string;
  topLabel?: string;
  bottomLabel?: string;
  options?: Array<RadioOptions>;
  value?: number | string;
  onChange?: OnChange;
}

export default function Radio(props: RadioProps) {
  const {name, lng, className, topLabel, bottomLabel, options, value, onChange} = props;

  const inputClassName = useMemo(() => {
    const classes = className?.split(' ').map(v => v.trim()) ?? [];
    if (classes.findIndex(v => v === 'radio') === -1) {
      classes.push('radio');
    }
    return classes.join(' ');
  }, [className]);

  return (
    <div className="flex flex-col w-full pl-0.5 py-0 space-y-2">
      <div className="flex flex-col w-full space-y-0.5">
        <p className="text-sm text-base-content">{topLabel}</p>
        <p className="text-xs text-base-content/70">{bottomLabel}</p>
      </div>

      <div className="flex flex-col">
        {options &&
          options.map(o => {
            return (
              <label key={o.value} className="label justify-start py-1 space-x-2">
                <input
                  type="radio"
                  lang={lng}
                  className={inputClassName}
                  name={name}
                  disabled={o.disabled}
                  aria-disabled={o.disabled}
                  checked={o.value === value}
                  aria-checked={o.value === value}
                  value={o.value}
                  onChange={onChange}
                />
                <span className="text-xs">{o.label}</span>
              </label>
            );
          })}
      </div>
    </div>
  );
}
