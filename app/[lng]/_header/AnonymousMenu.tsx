import Link from 'next/link';
import React from 'react';

interface AnonymousMenuProps {
  lng: string;
  loginLabel: string;
}

export default async function AnonymousMenu(props: AnonymousMenuProps) {
  const {lng, loginLabel} = props;
  return (
    <ul className="menu menu-horizontal p-0 font-bold">
      <li>
        <Link href={`/${lng}/login`} hrefLang={lng}>
          {loginLabel}
        </Link>
      </li>
    </ul>
  );
}
