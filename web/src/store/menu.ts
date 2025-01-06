import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import type { MenuState, MenuStore } from './types/menu';
import { queryMenus } from '@/api/menus';

const INITIAL_MENU_STATE: MenuState = {
    activeRootMenu: '',
    rootMenus: [],

    activeSubMenu: '',
    subMenus: [],
    subMenusLoading: false
};

const useMenuStore = create<MenuStore>()(
    immer((set, get) => ({
        ...INITIAL_MENU_STATE,
        getRootMenus: async (level = 0) => {
            if (get().activeRootMenu?.length > 0) return;
            const res = await queryMenus<number>(`level=${level}`);
            set((s) => {
                const firstMenu = res[0];
                s.activeRootMenu = s.activeRootMenu ? s.activeRootMenu : firstMenu.id;
                firstMenu && s.getSubMenusByParentId(firstMenu.id);
                s.rootMenus = res;
            });
        },
        getSubMenusByParentId: async (parentId) => {
            const res = await queryMenus<string>(`parentId=${parentId}`);
            set((s) => {
                s.subMenusLoading = false;
                s.activeSubMenu = s.activeSubMenu ? s.activeSubMenu : res?.[0]?.id;
                s.subMenus = res;
            });
        },
        setActiveRootMenu: (id) => {
            set((s) => {
                s.activeRootMenu = id;
                s.subMenusLoading = true;
                s.getSubMenusByParentId(id);
            });
        }
    }))
);

export default useMenuStore;
