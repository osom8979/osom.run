import {Metadata} from 'next';
import {ReactNode} from 'react';

// These styles apply to every route in the application
import './globals.scss';

export const metadata: Metadata = {
  title: 'osom.run',
  description: 'osom.run',
};

export default function RootLayout({children}: {children: ReactNode}) {
  return children;
}
