'use client';

import {User} from '@supabase/supabase-js';
import MdiDotsHorizontal from '@/app/icons/mdi/MdiDotsHorizontal';

interface UserMenuProps {
  lng: string;
  user: User;
  settingsLabel: string;
  logoutLabel: string;
}

export default function UserMenu(props: UserMenuProps) {
  console.assert(props);

  return (
    <div className="flex items-center gap-2">
      <button className="btn btn-sm btn-circle btn-ghost">
        <MdiDotsHorizontal className="w-6 h-6" />
      </button>

      {/*<IonNotifications className="w-6 h-6" />*/}
      {/*<UserDropdown*/}
      {/*  lng={lng}*/}
      {/*  user={user}*/}
      {/*  settingsLabel={settingsLabel}*/}
      {/*  logoutLabel={logoutLabel}*/}
      {/*/>*/}
      {/*<MdiDotsHorizontal className="w-6 h-6" />*/}
    </div>
  );
}
