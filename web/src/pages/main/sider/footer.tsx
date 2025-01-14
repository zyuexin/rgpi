import { User, Sun, Settings } from 'lucide-react';
import { useAppStore } from '@/store';
import { Button } from '@/components';
import { cn } from '@/utils/common';
import { useMemo } from 'react';

export const SiderFooter = () => {
    const isCollapsed = useAppStore((s) => s.leftResizablePanel.isCollapsed);
    const items = useMemo(() => {
        return [
            { title: 'User', icon: User, key: 'user', onClick: () => {} },
            { title: 'Theme', icon: Sun, key: 'theme', onClick: () => {} },
            { title: 'Settings', icon: Settings, key: 'settings', onClick: () => {} }
        ];
    }, []);
    return (
        <div className='h-48 p-4 flex flex-col justify-around'>
            {items.map((i) => {
                return (
                    <Button
                        onClick={i.onClick}
                        className={cn('w-full text-sm', isCollapsed ? 'justify-center' : 'justify-start')}
                        variant='ghost'
                        size={isCollapsed ? 'icon' : undefined}
                    >
                        <i.icon strokeWidth={1} size={16} className={isCollapsed ? 'mr-0' : 'mr-2'} />
                        <span className={isCollapsed ? 'hidden' : 'inline'}>{i.title}</span>
                    </Button>
                );
            })}
        </div>
    );
};
