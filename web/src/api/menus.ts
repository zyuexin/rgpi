import { MenuItemInfo } from '@/store';
import request from './request';

type QueryMenusParams<T extends number | string> = T extends number ? `level=${T}` : `parentId=${T}`;

export const queryMenus = async <T extends number | string>(queryParams: QueryMenusParams<T>) => {
    const res = (await request.get<MenuItemInfo[]>(`/menus?${queryParams}`, { shouldToast: false })) as MenuItemInfo[];
    return res;
};

export const queryTreeMenus = async () => {
    const res = (await request.get<MenuItemInfo[]>(`/treemenus`, { shouldToast: false })) as MenuItemInfo[];
    return res;
};
