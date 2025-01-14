import { useEffect, useMemo } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { cn } from '@/utils/common';
import { Tooltip, TooltipContent, TooltipTrigger, TooltipProvider, buttonVariants } from '@/components';
import { useMenuStore, useAppStore, PreferMenus } from '@/store';

export function Menu() {
    const navigate = useNavigate();
    const location = useLocation();
    const isCollapsed = useAppStore((s) => s.leftResizablePanel.isCollapsed);
    const treeMenus = useMenuStore((s) => s.treeMenus);
    const preferMenus = useMenuStore((s) => s.preferMenus);
    const activeRootMenu = useMemo(() => preferMenus.find((m) => m.active)?.['0'], [preferMenus]);
    const subMenus = useMemo(() => treeMenus.find((menu) => menu.id === activeRootMenu)?.children, [treeMenus, preferMenus]) || [];
    const activeSubMenu = useMemo(() => preferMenus.find((m) => m.active)?.['1'], [preferMenus]);
    const updatePreferMenus = useMenuStore((s) => s.updatePreferMenus);
    const setPreferMenus = useMenuStore((s) => s.setPreferMenus);

    const pathFromPreferMenus = useMemo(() => {
        const path = preferMenus.reduce((acc, cur) => {
            if (cur.active) {
                acc += `${cur['0']}/${cur['1']}`;
            }
            return acc;
        }, '/');
        return path;
    }, [preferMenus]);

    // 监听prefermenus的变化，如果当前路径不匹配，则导航到匹配的路径。
    useEffect(() => {
        location.pathname !== pathFromPreferMenus && navigate(pathFromPreferMenus);
    }, [pathFromPreferMenus, location.pathname, navigate]);

    // 监听location的变化，点击浏览器的回退和前进按钮更新一下prefermenus。
    useEffect(() => {
        // if (location.pathname !== pathFromPreferMenus) {
        //     const [_, root = '', sub = ''] = location.pathname.split('/');
        //     if (root && sub) {
        //         const preferMenusCopied: PreferMenus = JSON.parse(JSON.stringify(preferMenus));
        //         preferMenusCopied.forEach((menu) => {
        //             if (menu['0'] === root) {
        //                 menu.active = true;
        //                 menu['1'] = sub;
        //             } else {
        //                 menu.active = false;
        //             }
        //         });
        //         setPreferMenus(preferMenusCopied);
        //     }
        // }
    }, [location.pathname, pathFromPreferMenus, preferMenus]);

    return (
        <div data-collapsed={isCollapsed} className='group h-full overflow-hidden flex-1 flex flex-col gap-4 py-2 data-[collapsed=true]:py-2'>
            <nav className='grid gap-1 px-2 min-h-12 group-[[data-collapsed=true]]:justify-center group-[[data-collapsed=true]]:px-2'>
                {subMenus.map((link, index) =>
                    isCollapsed ? (
                        <TooltipProvider key={index}>
                            <Tooltip delayDuration={0}>
                                <TooltipTrigger asChild>
                                    {/* @ts-ignore */}
                                    <Link
                                        // to={link.path}
                                        className={cn(
                                            buttonVariants({ variant: activeSubMenu === link.id ? 'default' : 'ghost', size: 'icon' }),
                                            'h-9 w-9',
                                            link.id === activeSubMenu &&
                                                'dark:bg-muted dark:text-muted-foreground dark:hover:bg-muted dark:hover:text-white'
                                        )}
                                        onClick={(e) => void e.preventDefault() || updatePreferMenus(link.id, link.level)}
                                    >
                                        <span className={cn('h-4 w-4 flex items-center', link.icon)} />
                                        <span className='sr-only'>{link.name}</span>
                                    </Link>
                                </TooltipTrigger>
                                <TooltipContent side='right' className='flex items-center gap-4'>
                                    {link.name}:{link.description && <span className='ml-auto text-muted-foreground'>{link.description}</span>}
                                </TooltipContent>
                            </Tooltip>
                        </TooltipProvider>
                    ) : (
                        /* @ts-ignore */
                        <Link
                            key={index}
                            // to={link.path}
                            // to={'/'}
                            className={cn(
                                buttonVariants({ variant: activeSubMenu === link.id ? 'default' : 'ghost', size: 'sm' }),
                                link.id !== activeSubMenu && 'dark:bg-muted dark:text-white dark:hover:bg-muted dark:hover:text-white',
                                'justify-start'
                            )}
                            onClick={(e) => void e.preventDefault() || updatePreferMenus(link.id, link.level)}
                        >
                            <div className={cn('mr-2 h-4 w-4 flex items-center', link.icon)} />
                            {link.name}
                            {link.name && (
                                <span className={cn('ml-auto', link.id === activeSubMenu && 'text-background dark:text-white')}>{1234}</span>
                            )}
                        </Link>
                    )
                )}
            </nav>
        </div>
    );
}
