import { MenusInfo } from '@/store';
import request from './request';

type QueryMenusParams<T extends number | string> = `level=${T}` | `parentId=${T}`;

export const queryMenus = async <T extends number | string>(queryParams: QueryMenusParams<T>) => {
    const res = (await request.get<MenusInfo>(`/menus?${queryParams}`, { shouldToast: false })) as MenusInfo;
    return res;
};
