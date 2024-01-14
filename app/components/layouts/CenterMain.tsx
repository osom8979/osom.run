import Link from 'next/link';
import {type ReactNode} from 'react';
import Logo from '@/app/components/Logo';

interface CenterMainProps {
  children?: ReactNode;
  lng?: string;
  hideLogo?: boolean;
  logoHeight?: number | string;
}

export default async function CenterMain(props: CenterMainProps) {
  const {children, lng, hideLogo, logoHeight} = props;
  return (
    <main className="h-screen m-auto">
      <div className="flex flex-col justify-center items-center h-full space-y-8">
        {!hideLogo && (
          <Link href="/" hrefLang={lng}>
            <Logo height={logoHeight ?? '1.2em'} />
          </Link>
        )}

        {children}
      </div>
    </main>
  );
}
