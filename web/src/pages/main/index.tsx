import { useEffect, useRef } from 'react';
import { MenuItemInfo, useAppStore, useMenuStore, useUserStore } from '@/store';
import CookieUtil from '@/utils/cookie';
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from '@/components';
import Sider from './sider';
import { flatten, generateDefaultPreferMenus } from '@/utils/common';
import { Outlet } from 'react-router-dom';

export default function Content() {
    const resizablePanelRef = useRef<any>(null);
    const leftResizablePanel = useAppStore((s) => s.leftResizablePanel);
    const setLeftPanleIsCollapsed = useAppStore((s) => s.setLeftPanleIsCollapsed);

    const getTreeMenus = useMenuStore((s) => s.getTreeMenus);
    const setPreferMenus = useMenuStore((s) => s.setPreferMenus);
    const userInfo = useUserStore((s) => s.userInfo);
    const getUserInfo = useUserStore((s) => s.getUserInfo);

    useEffect(() => {
        (async () => {
            // 1.如果前台store中没有用户信息，则从后台获取用户信息存到前台store中
            if (!userInfo.email && CookieUtil.get(CookieUtil.USER_NAME)) {
                await getUserInfo(CookieUtil.get(CookieUtil.USER_NAME)!);
            }
            // 2.获取全部树形菜单
            const treeMenus = await getTreeMenus();
            // 3.获取用户偏好菜单，如果没有则生成默认的偏好菜单
            let pm = CookieUtil.getPreferMenus();
            if (pm.length <= 0) {
                const flattenedMenus = flatten<MenuItemInfo[]>(treeMenus);
                pm = generateDefaultPreferMenus(flattenedMenus);
            }
            setPreferMenus(pm);
        })();
    }, []);

    return (
        <main className='h-full min-h-[800px]'>
            <ResizablePanelGroup direction='horizontal'>
                <ResizablePanel
                    ref={resizablePanelRef}
                    collapsible
                    defaultSize={leftResizablePanel.defaultSize}
                    collapsedSize={leftResizablePanel.collapsedSize}
                    minSize={leftResizablePanel.mnSize}
                    maxSize={leftResizablePanel.maxSize}
                    onCollapse={() => void setLeftPanleIsCollapsed(true)}
                    onResize={() => void setLeftPanleIsCollapsed(false)}
                >
                    <Sider />
                </ResizablePanel>
                <ResizableHandle
                    withHandle
                    onDoubleClick={() => void resizablePanelRef.current?.[leftResizablePanel.isCollapsed ? 'expand' : 'collapse']()}
                />
                <Outlet />
            </ResizablePanelGroup>
        </main>
    );
}
