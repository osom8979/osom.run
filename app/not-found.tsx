import React from 'react';
import NotFoundCard from './_NotFoundCard';
import CenterDialog from '@/app/components/CenterDialog';

export default async function RootNotFound() {
  return (
    <html>
      <body className="min-h-screen flex flex-col">
        <main className="flex-grow h-0">
          <CenterDialog showLogo={true}>
            <NotFoundCard />
          </CenterDialog>
        </main>
      </body>
    </html>
  );
}
