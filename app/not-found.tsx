import Link from 'next/link';
import React from 'react';
import Logo from '@/app/components/Logo';
import NotFoundCard from '@/app/components/NotFoundCard';

export default async function NotFound() {
  return (
    <html>
      <body className="h-screen">
        <main className="m-auto h-full">
          <div className="flex flex-col justify-center items-center h-full space-y-8">
            <Link href="/">
              <Logo height="1.2em" />
            </Link>

            <NotFoundCard />
          </div>
        </main>
      </body>
    </html>
  );
}
