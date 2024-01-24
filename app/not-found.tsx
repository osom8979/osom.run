import React from 'react';
import NotFoundCard from './_NotFoundCard';
import CenterLayout from '@/app/components/CenterLayout';

export default async function RootNotFound() {
  return (
    <html>
      <body className="min-h-screen flex flex-col">
        <main className="flex-grow h-0">
          <CenterLayout showLogo={true}>
            <NotFoundCard />
          </CenterLayout>
        </main>
      </body>
    </html>
  );
}
