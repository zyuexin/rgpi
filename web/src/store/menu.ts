import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import type { MenuState, MenuStore } from './types/menu';
import { queryMenus } from '@/api/menus';

const INITIAL_MENU_STATE: MenuState = {
    activeRootMenu: '',
    rootMenus: [],

    activeSubMenu: '',
    subMenus: []
};

const useMenuStore = create<MenuStore>()(
    immer((set) => ({
        ...INITIAL_MENU_STATE,
        getRootMenus: async (level = 0) => {
            const res = await queryMenus<number>(`level=${level}`);
            set((state) => {
                state.activeRootMenu = res[0].id;
                state.rootMenus = res;
            });
        },
        getSubMenusByParentId: async (parentId) => {
            const res = await queryMenus<string>(`parentId=${parentId}`);
            set((state) => {
                state.activeSubMenu = res[0].id;
                state.subMenus = res;
            });
        },
        setActiveRootMenu: (id) => {
            set((state) => {
                state.activeRootMenu = id;
            });
        }
    }))
);

export default useMenuStore;
