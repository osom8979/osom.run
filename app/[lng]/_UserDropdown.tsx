'use client';

import {User} from '@supabase/supabase-js';
import Link from 'next/link';
import {useRouter} from 'next/navigation';
import {type MouseEvent} from 'react';
import LogoutButton from './_LogoutButton';
import MaterialSymbolsAccountCircle from '@/app/icons/ms/MaterialSymbolsAccountCircle';
import {appPaths} from '@/app/paths';

interface UserDropdownProps {
  lng: string;
  user: User;
  settingsLabel: string;
  logoutLabel: string;
}

export default function UserDropdown(props: UserDropdownProps) {
  const {lng, user, settingsLabel} = props;
  const router = useRouter();
  const handleLinkClick = (e: MouseEvent<HTMLAnchorElement>) => {
    router.push(e.currentTarget.href);

    // dropdown-content disappears when it loses focus
    e.currentTarget.blur();
  };

  // We can't use <button> here because Safari has a bug that prevents the button from
  // being focused. <div role="button" tabindex="0"> is a workaround for this bug.
  // It is accessible and works in all browsers.
  // https://bugs.webkit.org/show_bug.cgi?id=22261
  return (
    <div tabIndex={0} className="dropdown dropdown-end">
      <MaterialSymbolsAccountCircle className="btn btn-sm btn-circle btn-ghost w-8 h-8" />

      <ul className="dropdown-content menu bg-base-200 shadow rounded-box z-[1] w-52 mt-4 p-2">
        <span className="text-center">{user.email}</span>
        <div className="divider m-0"></div>

        <li>
          <Link
            hrefLang={lng}
            href={`/${lng}${appPaths.settingsProfile}`}
            onClick={handleLinkClick}
          >
            {settingsLabel}
          </Link>
        </li>

        <div className="divider m-0" />

        <li>
          <LogoutButton lng={lng} label={props.logoutLabel} />
        </li>
      </ul>
    </div>
  );
}
