'use client';

import Link from 'next/link';
import {usePathname} from 'next/navigation';
import type {ReactNode} from 'react';
import MdiAccountOutline from '@/app/icons/mdi/MdiAccountOutline';
import MdiBrushVariant from '@/app/icons/mdi/MdiBrushVariant';
import MdiConnection from '@/app/icons/mdi/MdiConnection';
import useTranslation from '@/app/libs/i18n/client';
import {appPaths} from '@/app/paths';

interface SettingsMenuProps {
  lng: string;
}

interface SettingsMenuItem {
  icon: ReactNode;
  text: string;
  href: string;
  lng?: string;
}

export default function SettingsMenu(props: SettingsMenuProps) {
  const {lng} = props;
  const {t} = useTranslation(lng, 'settings');
  const pathname = usePathname();

  const menuItems = [
    {
      icon: <MdiAccountOutline />,
      text: t('menus.profile'),
      href: `/${lng}${appPaths.settingsProfile}`,
    },
    {
      icon: <MdiBrushVariant />,
      text: t('menus.appearance'),
      href: `/${lng}${appPaths.settingsAppearance}`,
    },
    {
      icon: <MdiConnection />,
      text: t('menus.connection'),
      href: `/${lng}${appPaths.settingsConnection}`,
    },
  ] as Array<SettingsMenuItem>;

  return (
    <ul>
      {menuItems.map((menu, index) => {
        return (
          <li key={index} data-tip={menu.text}>
            <Link
              href={menu.href}
              hrefLang={menu.lng ?? lng}
              data-active={pathname.startsWith(menu.href)}
            >
              {menu.icon}
              <span>{menu.text}</span>
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
