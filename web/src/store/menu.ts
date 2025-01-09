import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import type { MenuItemInfo, MenuState, MenuStore } from './types/menu';
import { queryMenus, queryTreeMenus } from '@/api/menus';
import CookieUtil from '@/utils/cookie';
import { flatten, generateDefaultPreferMenus } from '@/utils/common';

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
            // 生成默认偏好菜单列表
            let preferMenus = get().preferMenus;
            if (preferMenus.length <= 0) {
                const flattenedMenus = flatten<MenuItemInfo[]>(res);
                preferMenus = generateDefaultPreferMenus(flattenedMenus);
            }

            set((s) => {
                s.treeMenus = res;
                s.preferMenus = preferMenus;
            });
            return res;
        },
        updatePreferMenus: (menuItem: MenuItemInfo) => {}
    }))
);

export default useMenuStore;
