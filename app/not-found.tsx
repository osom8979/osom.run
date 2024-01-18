import React from 'react';
import NotFoundCard from '@/app/components/data/display/NotFoundCard';
import CenterDialog from '@/app/components/layout/CenterDialog';

export default async function RootNotFound() {
  return (
    <html>
      <body>
        <CenterDialog>
          <NotFoundCard />
        </CenterDialog>
      </body>
    </html>
  );
}
