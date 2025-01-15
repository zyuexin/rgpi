import { useCallback, useMemo } from 'react';
import { useMenuStore, useAppStore } from '@/store';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components';
import { cn } from '@/utils/common';

export function ModuleSwitcher() {
    const isCollapsed = useAppStore((s) => s.leftResizablePanel.isCollapsed);

    const treeMenus = useMenuStore((s) => s.treeMenus);
    const preferMenus = useMenuStore((s) => s.preferMenus);
    const updatePreferMenus = useMenuStore((s) => s.updatePreferMenus);
    const activeRootMenu = useMemo(() => preferMenus.find((m) => m.active)?.['0'], [preferMenus]);

    const setActiveRootMenu = useCallback(
        (id: string) => {
            updatePreferMenus(id, 0);
        },
        [preferMenus, updatePreferMenus]
    );

    return (
        <div className='flex h-[52px] items-center justify-center px-4'>
            <Select value={activeRootMenu} defaultValue={activeRootMenu} onValueChange={setActiveRootMenu}>
                <SelectTrigger
                    className={cn(
                        'flex items-center gap-2 [&>span]:line-clamp-1 [&>span]:flex [&>span]:w-full [&>span]:items-center [&>span]:gap-1 [&>span]:truncate [&_svg]:h-4 [&_svg]:w-4 [&_svg]:shrink-0',
                        isCollapsed && 'flex h-9 w-9 shrink-0 items-center justify-center p-0 [&>span]:w-auto [&>svg]:hidden'
                    )}
                    aria-label='Select account'
                >
                    <SelectValue placeholder='Select an account'>
                        <div className={treeMenus.find((menu) => menu.id === activeRootMenu)?.icon} />
                        <span className={cn('ml-2', isCollapsed && 'hidden')}>{treeMenus.find((menu) => menu.id === activeRootMenu)?.name}</span>
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
