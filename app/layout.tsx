import * as React from 'react';
import './globals.css';

export const metadata = {
  title: 'osom.run',
  description: 'osom.run',
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en">
      <body>
        <main>{children}</main>
      </body>
    </html>
  );
}
