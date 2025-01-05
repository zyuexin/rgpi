export type MenuItemInfo = {
    id: string;
    name: string;
    parentId: string;
    path: string;
    level: number;
    icon: string;
    sortOrder: number;
    description: string;
};

export type MenusInfo = MenuItemInfo[];

export type MenuState = {
    activeRootMenu: string;
    rootMenus: MenusInfo;

    activeSubMenu: string;
    subMenus: MenusInfo;
};

export type MenuAction = {
    getRootMenus: (level?: number) => Promise<void>;
    getSubMenusByParentId: (parentId: string) => Promise<void>;
    setActiveRootMenu: (id: string) => void;
};

export type MenuStore = MenuState & MenuAction;
