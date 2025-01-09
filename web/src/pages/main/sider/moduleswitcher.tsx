import { useEffect } from 'react';
import { useMenuStore, useAppStore, useUserStore } from '@/store';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components';
import { useActiveMenu } from '@/hooks';
import { cn } from '@/utils/common';
import CookieUtil from '@/utils/cookie';

export function ModuleSwitcher() {
    const isCollapsed = useAppStore((s) => s.leftResizablePanel.isCollapsed);

    const treeMenus = useMenuStore((s) => s.treeMenus);
    const getTreeMenus = useMenuStore((s) => s.getTreeMenus);

    const userInfo = useUserStore((s) => s.userInfo);
    const getUserInfo = useUserStore((s) => s.getUserInfo);

    useEffect(() => {
        (async () => {
            // 1.如果前台store中没有email，则从后台获取用户信息存到前台store中
            if (!userInfo.email && CookieUtil.get(CookieUtil.USER_NAME)) {
                await getUserInfo(CookieUtil.get(CookieUtil.USER_NAME)!);
            }
            // 2.获取第一级菜单
            getTreeMenus();
        })();
    }, []);

    return (
        <div className='flex h-[64px] items-center justify-center px-4'>
            <Select value={activeRootMenu} defaultValue={activeRootMenu} onValueChange={setActiveRootMenu}>
                <SelectTrigger
                    className={cn(
                        'flex items-center gap-2 [&>span]:line-clamp-1 [&>span]:flex [&>span]:w-full [&>span]:items-center [&>span]:gap-1 [&>span]:truncate [&_svg]:h-4 [&_svg]:w-4 [&_svg]:shrink-0',
                        isCollapsed && 'flex h-9 w-9 shrink-0 items-center justify-center p-0 [&>span]:w-auto [&>svg]:hidden'
                    )}
                    aria-label='Select account'
                >
                    <SelectValue placeholder='Select an account'>
                        <div className={rootMenus.find((menu) => menu.id === activeRootMenu)?.icon} />
                        <span className={cn('ml-2', isCollapsed && 'hidden')}>{rootMenus.find((menu) => menu.id === activeRootMenu)?.name}</span>
                    </SelectValue>
                </SelectTrigger>
                <SelectContent>
                    {treeMenus.map((menu) => (
                        <SelectItem key={menu.id} value={menu.id}>
                            <div className='flex items-center gap-3 [&_svg]:h-4 [&_svg]:w-4 [&_svg]:shrink-0 [&_svg]:text-foreground'>
                                <div className={menu.icon} />
                                {menu.name}
                            </div>
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>
        </div>
    );
}
