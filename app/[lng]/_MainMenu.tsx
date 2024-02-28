'use client';

import type {User} from '@supabase/supabase-js';
import Link from 'next/link';
import {usePathname} from 'next/navigation';
import {Fragment, type ReactNode} from 'react';
import FlowbiteChevronDownSolid from '@/app/icons/flowbite/FlowbiteChevronDownSolid';
import IonNotifications from '@/app/icons/ion/IonNotifications';
import MdiAccountCircle from '@/app/icons/mdi/MdiAccountCircle';
import MaterialSymbolsDeleteRounded from '@/app/icons/ms/MaterialSymbolsDeleteRounded';
import MaterialSymbolsFolderRounded from '@/app/icons/ms/MaterialSymbolsFolderRounded';
import MaterialSymbolsGroups from '@/app/icons/ms/MaterialSymbolsGroups';
import MaterialSymbolsHomeRounded from '@/app/icons/ms/MaterialSymbolsHomeRounded';
import MaterialSymbolsLogoutRounded from '@/app/icons/ms/MaterialSymbolsLogoutRounded';
import MaterialSymbolsNoteAddRounded from '@/app/icons/ms/MaterialSymbolsNoteAddRounded';
import MaterialSymbolsSearch from '@/app/icons/ms/MaterialSymbolsSearch';
import MaterialSymbolsSettingsRounded from '@/app/icons/ms/MaterialSymbolsSettingsRounded';
import MaterialSymbolsStarRounded from '@/app/icons/ms/MaterialSymbolsStarRounded';
import useTranslation from '@/app/libs/i18n/client';
import {getProfile} from '@/app/libs/supabase/metadata';
import {appPaths} from '@/app/paths';

interface MainMenuProps {
  lng: string;
  user: User;
}

interface MainMenuItem {
  icon: ReactNode;
  text: string;
  href: string;
  lng?: string;
}

export default function MainMenu(props: MainMenuProps) {
  const {lng, user} = props;
  const {t} = useTranslation(lng, 'root');
  const pathname = usePathname();
  const profile = getProfile(user);

  const menuItems = [
    {
      icon: <MaterialSymbolsHomeRounded />,
      text: t('menus.home'),
      href: `/${lng}`,
    },
    {
      icon: <IonNotifications />,
      text: t('menus.notification'),
      href: `/${lng}${appPaths.notification}`,
    },
    {
      icon: <MaterialSymbolsSearch />,
      text: t('menus.search'),
      href: `/${lng}/search`,
    },
    {
      icon: <MaterialSymbolsStarRounded />,
      text: t('menus.starred'),
      href: `/${lng}/starred`,
    },
    {
      icon: <MaterialSymbolsGroups />,
      text: t('menus.teams'),
      href: `/${lng}/teams`,
    },
    {
      icon: <MaterialSymbolsFolderRounded />,
      text: t('menus.files'),
      href: `/${lng}/files`,
    },
    {
      icon: <MaterialSymbolsNoteAddRounded />,
      text: t('menus.new'),
      href: `/${lng}/new`,
    },
    {
      icon: <MaterialSymbolsSettingsRounded />,
      text: t('menus.settings'),
      href: `/${lng}${appPaths.settings}`,
    },
    {
      icon: <MaterialSymbolsDeleteRounded />,
      text: t('menus.trash'),
      href: `/${lng}/trash`,
    },
    {
      icon: <MaterialSymbolsLogoutRounded />,
      text: t('menus.logout'),
      href: `/${lng}/logout`,
    },
  ] as Array<MainMenuItem>;

  return (
    <Fragment>
      <div className="flex flex-row items-center justify-between btn btn-ghost px-2">
        <MdiAccountCircle className="w-7 h-7" />
        <div className="flex-1 flex flex-row items-center">
          <p>{profile.nickname ?? t('nameless')}</p>
        </div>
        <FlowbiteChevronDownSolid className="w-6 h-6" />
      </div>

      <ul>
        {menuItems.map((menu, index) => {
          return (
            <li key={index} data-tip={menu.text}>
              <Link
                href={menu.href}
                hrefLang={menu.lng ?? lng}
                data-active={pathname == menu.href}
              >
                {menu.icon}
                {menu.text && <span>{menu.text}</span>}
              </Link>
            </li>
          );
        })}
      </ul>
    </Fragment>
  );
}
