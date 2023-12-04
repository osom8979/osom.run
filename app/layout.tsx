import {Metadata} from 'next';
import {ReactNode} from 'react';

// These styles apply to every route in the application
import './globals.scss';

export const metadata: Metadata = {
  title: 'osom.run',
  description: 'osom.run',
  applicationName: 'osom.run',
  authors: [{name: 'zer0', url: 'https://github.com/osom8979'}],
};

export default function RootLayout({children}: {children: ReactNode}) {
  return children;
}
