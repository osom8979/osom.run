'use client';

import type {User} from '@supabase/supabase-js';
import Link from 'next/link';
import {usePathname} from 'next/navigation';
import type {ReactNode} from 'react';
import FlowbiteChevronDownSolid from '@/app/icons/flowbite/FlowbiteChevronDownSolid';
import MdiAccountCircle from '@/app/icons/mdi/MdiAccountCircle';
import PajamasProgress from '@/app/icons/pajamas/PajamasProgress';
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
      icon: <PajamasProgress />,
      text: t('menus.progress'),
      href: `/${lng}${appPaths.progress}`,
    },
  ] as Array<MainMenuItem>;

  return (
    <ul>
      <div className="flex flex-row items-center justify-between btn btn-ghost px-2">
        <MdiAccountCircle className="w-7 h-7" />
        <div className="flex-1 flex flex-row items-center">
          <p>{profile.nickname ?? t('nameless')}</p>
        </div>
        <FlowbiteChevronDownSolid className="w-6 h-6" />
      </div>

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
  );
}
