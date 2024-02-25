import {create} from 'zustand';

export interface MenuState {
  show: boolean;
  toggleMenu: () => void;
  showMenu: () => void;
  hideMenu: () => void;
  // eslint-disable-next-line no-unused-vars
  setMenuVisible: (show: boolean) => void;
}

export const useMenuStore = create<MenuState>(set => ({
  show: false,
  toggleMenu: () => set(state => ({show: !state.show})),
  showMenu: () => set({show: true}),
  hideMenu: () => set({show: false}),
  setMenuVisible: (show: boolean) => set({show}),
}));

export default useMenuStore;
