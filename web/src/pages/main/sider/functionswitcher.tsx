import { cn } from '@/utils/utils';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components';
import useAppStore from '@/store/app';
import useMenuStore from '@/store/menu';
import { useEffect } from 'react';

export function FunctionSwitcher() {
    const { leftResizablePanel } = useAppStore();
    const { rootMenus, activeRootMenu, setActiveRootMenu, getRootMenus } = useMenuStore();

    useEffect(() => {
        getRootMenus();
    }, []);

    return (
        <Select value={activeRootMenu} defaultValue={activeRootMenu} onValueChange={setActiveRootMenu}>
            <SelectTrigger
                className={cn(
                    'flex items-center gap-2 [&>span]:line-clamp-1 [&>span]:flex [&>span]:w-full [&>span]:items-center [&>span]:gap-1 [&>span]:truncate [&_svg]:h-4 [&_svg]:w-4 [&_svg]:shrink-0',
                    leftResizablePanel.isCallapsed && 'flex h-9 w-9 shrink-0 items-center justify-center p-0 [&>span]:w-auto [&>svg]:hidden'
                )}
                aria-label='Select account'
            >
                <SelectValue placeholder='Select an account'>
                    <div className={rootMenus.find((menu) => menu.id === activeRootMenu)?.icon} />
                    <span className={cn('ml-2', leftResizablePanel.isCallapsed && 'hidden')}>
                        {rootMenus.find((menu) => menu.id === activeRootMenu)?.name}
                    </span>
                </SelectValue>
            </SelectTrigger>
            <SelectContent>
                {rootMenus.map((menu) => (
                    <SelectItem key={menu.id} value={menu.id}>
                        <div className='flex items-center gap-3 [&_svg]:h-4 [&_svg]:w-4 [&_svg]:shrink-0 [&_svg]:text-foreground'>
                            <div className={menu.icon} />
                            {menu.name}
                        </div>
                    </SelectItem>
                ))}
            </SelectContent>
        </Select>
    );
}
