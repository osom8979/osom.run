import {type HTMLAttributes, SVGProps, useMemo} from 'react';
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

interface SvgNumberProps extends Omit<HTMLAttributes<HTMLDivElement>, 'className'> {
  value: number | string;
  className?: string;
  svgClassName?: string;
}

interface SvgCharProps extends SVGProps<SVGSVGElement> {
  c: string;
}

function SvgChar(props: SvgCharProps) {
  const {c, ...attrs} = props;
  switch (c) {
    case '0':
      return <TdesignNumbers0 {...attrs} />;
    case '1':
      return <TdesignNumbers1 {...attrs} />;
    case '2':
      return <TdesignNumbers2 {...attrs} />;
    case '3':
      return <TdesignNumbers3 {...attrs} />;
    case '4':
      return <TdesignNumbers4 {...attrs} />;
    case '5':
      return <TdesignNumbers5 {...attrs} />;
    case '6':
      return <TdesignNumbers6 {...attrs} />;
    case '7':
      return <TdesignNumbers7 {...attrs} />;
    case '8':
      return <TdesignNumbers8 {...attrs} />;
    case '9':
      return <TdesignNumbers9 {...attrs} />;
    case '.':
      return <PhDotOutlineFill {...attrs} />;
    case '+':
      return <IcBaselinePlus {...attrs} />;
    case '-':
      return <IcBaselineMinus {...attrs} />;
    default:
      throw new UnsupportedError(`Unsupported SVG character: ${c}`);
  }
}

export default function SvgNumber(props: SvgNumberProps) {
  const {value, className, svgClassName, ...attrs} = props;
  const chars = useMemo(() => {
    const text = typeof value !== 'string' ? value.toString() : value;
    return text.split('');
  }, [value]);

  const finalClassName = ['flex', 'flex-row', 'space-x-[-1.4rem]', className]
    .filter(v => typeof v !== 'undefined')
    .join(' ');

  const finalSvgClassName = ['w-16', 'h-16', svgClassName]
    .filter(v => typeof v !== 'undefined')
    .join(' ');

  return (
    <div className={finalClassName} {...attrs}>
      {chars &&
        chars.map((c, i) => {
          return <SvgChar key={i} c={c} className={finalSvgClassName} />;
        })}
    </div>
  );
}
