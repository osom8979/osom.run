import Link from 'next/link';
import React from 'react';

interface AnonymousMenuProps {
  lng: string;
  signInLabel: string;
}

export default async function AnonymousMenu(props: AnonymousMenuProps) {
  const {lng, signInLabel} = props;
  return (
    <ul className="menu menu-horizontal">
      <li>
        <Link className="font-bold py-0.5" href={`/${lng}/signin`}>
          {signInLabel}
        </Link>
      </li>
    </ul>
  );
}
