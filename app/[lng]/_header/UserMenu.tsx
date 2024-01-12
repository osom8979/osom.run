import {User} from '@supabase/supabase-js';
import Link from 'next/link';
import React from 'react';
import LogoutButton from '@/app/[lng]/_header/LogoutButton';
import MdiAccountCircle from '@/app/icons/mdi/MdiAccountCircle';

interface UserMenuProps {
  lng: string;
  user: User;
  settingsLabel: string;
  logoutLabel: string;
}

export default async function UserMenu(props: UserMenuProps) {
  const {lng, user, settingsLabel, logoutLabel} = props;

  return (
    <div className="dropdown dropdown-end">
      <div tabIndex={0} role="button" className="p-2">
        <MdiAccountCircle className="w-6 h-6 fill-current" />
      </div>

      <ul
        tabIndex={0}
        className="menu dropdown-content z-[1] bg-base-100 shadow rounded-box w-52 mt-4 p-2"
      >
        <span className="text-center">{user.email}</span>
        <div className="divider m-0"></div>

        <li>
          <Link href={`/${lng}/user/settings`}>{settingsLabel}</Link>
        </li>

        <div className="divider m-0"></div>
        <li>
          <LogoutButton label={logoutLabel} />
        </li>
      </ul>
    </div>
  );
}
