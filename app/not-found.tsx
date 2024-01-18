import React from 'react';
import NotFoundCard from '@/app/components/data/display/NotFoundCard';
import CenterMain from '@/app/components/layout/CenterMain';

export default async function RootNotFound() {
  return (
    <html>
      <body>
        <CenterMain>
          <NotFoundCard />
        </CenterMain>
      </body>
    </html>
  );
}
