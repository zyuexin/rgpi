export type MenuItemInfo = {
    id: string;
    name: string;
    parentId: string;
    path: string;
    level: number;
    icon: string;
    sortOrder: number;
    description: string;
    todoCount?: number;
    children: MenuItemInfo[];
};

export type MenuLevel = `${number}`;
export type PreferMenus = Array<
    {
        active: boolean;
    } & {
        [key: MenuLevel]: string;
    }
>;

export type MenuState = {
    treeMenus: MenuItemInfo[];
    rootMenus: MenuItemInfo[];
    subMenus: MenuItemInfo[];
    subMenusLoading: boolean;
    preferMenus: PreferMenus;
};

export type MenuAction = {
    getRootMenus: () => Promise<MenuItemInfo[]>;
    getSubMenusByParentId: (parentId: string) => Promise<MenuItemInfo[]>;
    getTreeMenus: () => Promise<MenuItemInfo[]>;
    updatePreferMenus: (preferMenus: MenuItemInfo) => void;
};

export type MenuStore = MenuState & MenuAction;
