import React from 'react';
import CenterMain from '@/app/components/layouts/CenterMain';
import NotFoundCard from '@/app/components/NotFoundCard';

export default async function NotFound() {
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
