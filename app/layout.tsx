import React from 'react';

// These styles apply to every route in the application
import './globals.scss';

export const metadata = {
  title: 'osom.run',
  description: 'osom.run',
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
