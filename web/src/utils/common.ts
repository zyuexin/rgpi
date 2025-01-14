import type { PreferMenus, MenuItemInfo, MenuLevel } from '@/store';
import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export const cn = (...inputs: ClassValue[]) => {
    return twMerge(clsx(inputs));
};

/**
 * 生成偏爱菜单
 * @todo 需要测试
 */
export const generateDefaultPreferMenus = (menus: MenuItemInfo[]) => {
    const preferMenus: PreferMenus = menus.reduce((acc, cur, curIdx) => {
        if (cur.level === 0) {
            acc.push({
                0: cur.id,
                active: !curIdx
            });
        } else {
            acc.forEach((pm) => {
                const curLevel = (cur.level - 0).toString() as MenuLevel;
                const preLevel = (cur.level - 1).toString() as MenuLevel;
                if (!pm[curLevel] && cur.parentId === pm[preLevel]) {
                    pm[curLevel] = cur.id;
                }
            });
        }
        return acc;
    }, [] as PreferMenus);
    return preferMenus;
};

/**
 * 将树形结构展开为扁平结构
 * @todo TS类型推断有问题，需要改进
 */
export const flatten = <T extends any[]>(data: T, level = 0): any => {
    let flatNodes: T[] = [];

    for (const node of data) {
        // 假设每个节点都有一个唯一的 id 属性
        flatNodes.push(node as any);

        // 递归处理子节点
        if (node.children && node.children.length > 0) {
            flatNodes = flatNodes.concat(flatten(node['children'], level + 1));
        }
    }

    return flatNodes;
};
