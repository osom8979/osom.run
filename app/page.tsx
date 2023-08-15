'use client';

import Image from 'next/image';
import {Button} from 'osom-ui';
import React from 'react';
import OsomRunSvg from '../public/osom.run.svg';

export default async function RootPage() {
  return (
    <main>
      <h1 className="font-sans">osom.run</h1>
      <Image src={OsomRunSvg} alt="osom.run" width={112} height={48} />
      <Button />
    </main>
  );
}
