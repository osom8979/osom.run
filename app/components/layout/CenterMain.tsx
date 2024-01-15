import Link from 'next/link';
import {type ReactNode} from 'react';
import Logo from '@/app/components/Logo';

interface CenterMainProps {
  children?: ReactNode;
  lng?: string;
  hideLogo?: boolean;
}

export default async function CenterMain(props: CenterMainProps) {
  const {children, lng, hideLogo} = props;
  return (
    <main className="container h-screen m-auto">
      <div className="flex flex-col justify-center items-center h-full space-y-8">
        {!hideLogo && (
          <Link href={`/${lng ?? ''}`} hrefLang={lng}>
            <Logo className="h-6" />
          </Link>
        )}

        {children}
      </div>
    </main>
  );
}
