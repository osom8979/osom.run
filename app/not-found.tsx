import React from 'react';
import NotFoundCard from '@/app/components/data/display/NotFoundCard';
import CenterDialog from '@/app/components/layout/CenterDialog';

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
