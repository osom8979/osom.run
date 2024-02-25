'use client';

import type {ChangeEvent} from 'react';
import MaterialSymbolsCloseRounded from '@/app/icons/ms/MaterialSymbolsCloseRounded';
import MaterialSymbolsMenuRounded from '@/app/icons/ms/MaterialSymbolsMenuRounded';
import useMenuStore from '@/app/libs/zustand/menu';

export default function MenuButton() {
  const setMenuVisible = useMenuStore(state => state.setMenuVisible);
  const handleChange = async (event: ChangeEvent<HTMLInputElement>) => {
    setMenuVisible(event.currentTarget.checked);
  };

  return (
    <label className="btn btn-sm btn-circle btn-ghost swap swap-rotate">
      <input type="checkbox" onChange={e => handleChange(e)} />

      <MaterialSymbolsMenuRounded className="swap-off w-6 h-6" />
      <MaterialSymbolsCloseRounded className="swap-on w-6 h-6" />
    </label>
  );
}
