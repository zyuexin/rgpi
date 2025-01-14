import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import type { MenuLevel, MenuState, MenuStore, PreferMenus } from './types/menu';
import { queryMenus, queryTreeMenus } from '@/api/menus';
import CookieUtil from '@/utils/cookie';

const INITIAL_MENU_STATE: MenuState = {
    treeMenus: [],
    rootMenus: [],
    subMenus: [],
    preferMenus: JSON.parse(CookieUtil.get('PreferMenus') || '[]') || [],
    subMenusLoading: false
};

const useMenuStore = create<MenuStore>()(
    immer((set, get) => ({
        ...INITIAL_MENU_STATE,
        getRootMenus: async () => {
            const rm = get().rootMenus;
            if (rm?.length > 0) return rm;
            const res = await queryMenus<number>(`level=${0}`);
            set((s) => {
                s.rootMenus = res;
            });
            return res;
        },
        getSubMenusByParentId: async (parentId) => {
            const res = (await queryMenus<string>(`parentId=${parentId}`)) || [];
            set((s) => {
                s.subMenusLoading = false;
                s.subMenus = res;
            });
            return res;
        },
        getTreeMenus: async () => {
            const res = (await queryTreeMenus()) || [];
            set((s) => {
                s.treeMenus = res;
            });
            return res;
        },
        updatePreferMenus: (menuId: string, level: number) => {
            const preferMenusCopied: PreferMenus = JSON.parse(JSON.stringify(get().preferMenus));
            if (level === 0) {
                for (const item of preferMenusCopied) {
                    item.active = menuId === item['0'];
                }
            } else {
                const activeRootMenu = preferMenusCopied.find((item) => item.active);
                if (activeRootMenu) {
                    activeRootMenu[level.toString() as MenuLevel] = menuId;
                }
            }
            set((s) => {
                s.preferMenus = preferMenusCopied;
            });
            CookieUtil.set('PreferMenus', JSON.stringify(preferMenusCopied), { path: '/' });
        },
        setPreferMenus: (preferMenus) => {
            CookieUtil.set('PreferMenus', JSON.stringify(preferMenus), { path: '/' });
            set((s) => {
                s.preferMenus = preferMenus;
            });
        }
    }))
);

export default useMenuStore;
