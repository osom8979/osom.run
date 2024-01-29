import {type HTMLAttributes, useMemo} from 'react';
import {UnsupportedError} from '@/app/exceptions';
import IcBaselineMinus from '@/app/icons/ic/IcBaselineMinus';
import IcBaselinePlus from '@/app/icons/ic/IcBaselinePlus';
import PhDotOutlineFill from '@/app/icons/ph/PhDotOutlineFill';
import TdesignNumbers0 from '@/app/icons/tdesign/TdesignNumbers0';
import TdesignNumbers1 from '@/app/icons/tdesign/TdesignNumbers1';
import TdesignNumbers2 from '@/app/icons/tdesign/TdesignNumbers2';
import TdesignNumbers3 from '@/app/icons/tdesign/TdesignNumbers3';
import TdesignNumbers4 from '@/app/icons/tdesign/TdesignNumbers4';
import TdesignNumbers5 from '@/app/icons/tdesign/TdesignNumbers5';
import TdesignNumbers6 from '@/app/icons/tdesign/TdesignNumbers6';
import TdesignNumbers7 from '@/app/icons/tdesign/TdesignNumbers7';
import TdesignNumbers8 from '@/app/icons/tdesign/TdesignNumbers8';
import TdesignNumbers9 from '@/app/icons/tdesign/TdesignNumbers9';

interface SvgNumberProps extends HTMLAttributes<HTMLDivElement> {
  value: number | string;
}

function SvgChar({c}: {c: string}) {
  switch (c) {
    case '0':
      return <TdesignNumbers0 />;
    case '1':
      return <TdesignNumbers1 />;
    case '2':
      return <TdesignNumbers2 />;
    case '3':
      return <TdesignNumbers3 />;
    case '4':
      return <TdesignNumbers4 />;
    case '5':
      return <TdesignNumbers5 />;
    case '6':
      return <TdesignNumbers6 />;
    case '7':
      return <TdesignNumbers7 />;
    case '8':
      return <TdesignNumbers8 />;
    case '9':
      return <TdesignNumbers9 />;
    case '.':
      return <PhDotOutlineFill />;
    case '+':
      return <IcBaselinePlus />;
    case '-':
      return <IcBaselineMinus />;
    default:
      throw new UnsupportedError(`Unsupported SVG character: ${c}`);
  }
}

export default function SvgNumber(props: SvgNumberProps) {
  const {value, ...attrs} = props;
  const chars = useMemo(() => {
    const text = typeof value !== 'string' ? value.toString() : value;
    return text.split('');
  }, [value]);
  return (
    <div {...attrs}>
      {chars &&
        chars.map((c, i) => {
          return <SvgChar key={i} c={c} />;
        })}
    </div>
  );
}
