'use client';

import {User} from '@supabase/supabase-js';
import UserDropdown from './_UserDropdown';
import MaterialSymbolsNotificationsOutlineRounded from '@/app/icons/ms/MaterialSymbolsNotificationsOutlineRounded';

interface UserMenuProps {
  lng: string;
  user: User;
  settingsLabel: string;
  logoutLabel: string;
}

export default function UserMenu(props: UserMenuProps) {
  const {lng, user, settingsLabel, logoutLabel} = props;
  return (
    <div className="flex items-center gap-2">
      <button className="btn btn-sm btn-circle btn-ghost">
        <MaterialSymbolsNotificationsOutlineRounded className="w-7 h-7" />
      </button>

      <UserDropdown
        lng={lng}
        user={user}
        settingsLabel={settingsLabel}
        logoutLabel={logoutLabel}
      />
    </div>
  );
}
