import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { cn } from '@/utils/common';
import { Tooltip, TooltipContent, TooltipTrigger, TooltipProvider, buttonVariants, Loading } from '@/components';
import { useMenuStore, useAppStore } from '@/store';

export function Menu() {
    const isCollapsed = useAppStore((s) => s.leftResizablePanel.isCollapsed);
    const subMenusLoading = useMenuStore((s) => s.subMenusLoading);
    const subMenus = useMenuStore((s) => s.subMenus);
    const activeSubMenu = useMenuStore((s) => s.activeSubMenu);
    const activeRootMenu = useMenuStore((s) => s.activeRootMenu);

    const actSubMenu = useMemo(() => activeSubMenu.get(activeRootMenu), [activeRootMenu, activeSubMenu]);

    return (
        <div data-collapsed={isCollapsed} className='group h-full overflow-hidden flex-1 flex flex-col gap-4 py-2 data-[collapsed=true]:py-2'>
            {subMenusLoading ? (
                <div className='m-auto'>
                    <Loading className='self-center' />
                </div>
            ) : (
                <nav className='grid gap-1 px-2 min-h-12 group-[[data-collapsed=true]]:justify-center group-[[data-collapsed=true]]:px-2'>
                    {subMenus.map((link, index) =>
                        isCollapsed ? (
                            <TooltipProvider key={index}>
                                <Tooltip delayDuration={0}>
                                    <TooltipTrigger asChild>
                                        <Link
                                            to={link.path}
                                            className={cn(
                                                buttonVariants({ variant: actSubMenu === link.id ? 'default' : 'ghost', size: 'icon' }),
                                                'h-9 w-9',
                                                link.id === actSubMenu &&
                                                    'dark:bg-muted dark:text-muted-foreground dark:hover:bg-muted dark:hover:text-white'
                                            )}
                                        >
                                            <span className={cn('h-4 w-4 flex items-center', link.icon)} />
                                            <span className='sr-only'>{link.name}</span>
                                        </Link>
                                    </TooltipTrigger>
                                    <TooltipContent side='right' className='flex items-center gap-4'>
                                        {link.name}:
                                        {link.description && <span className='ml-auto text-muted-foreground'>{link.description}</span>}
                                    </TooltipContent>
                                </Tooltip>
                            </TooltipProvider>
                        ) : (
                            <Link
                                key={index}
                                to={link.path}
                                className={cn(
                                    buttonVariants({ variant: actSubMenu === link.id ? 'default' : 'ghost', size: 'sm' }),
                                    link.id !== actSubMenu && 'dark:bg-muted dark:text-white dark:hover:bg-muted dark:hover:text-white',
                                    'justify-start'
                                )}
                            >
                                <div className={cn('mr-2 h-4 w-4 flex items-center', link.icon)} />
                                {link.name}
                                {link.name && (
                                    <span className={cn('ml-auto', link.id === actSubMenu && 'text-background dark:text-white')}>{1234}</span>
                                )}
                            </Link>
                        )
                    )}
                </nav>
            )}
        </div>
    );
}
