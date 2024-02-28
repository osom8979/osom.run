'use client';

import Link from 'next/link';
import {usePathname} from 'next/navigation';
import type {ReactNode} from 'react';
import PajamasProgress from '@/app/icons/pajamas/PajamasProgress';
import useTranslation from '@/app/libs/i18n/client';
import {appPaths} from '@/app/paths';

interface MainMenuProps {
  lng: string;
}

interface MainMenuItem {
  icon: ReactNode;
  text: string;
  href: string;
  lng?: string;
}

export default function MainMenu(props: MainMenuProps) {
  const {lng} = props;
  const {t} = useTranslation(lng, 'root');
  const pathname = usePathname();

  const menuItems = [
    {
      icon: <PajamasProgress />,
      text: t('menus.progress'),
      href: `/${lng}${appPaths.progress}`,
    },
  ] as Array<MainMenuItem>;

  return (
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
  );
}
