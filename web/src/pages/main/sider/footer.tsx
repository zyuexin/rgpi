import { User } from 'lucide-react';
import { useAppStore } from '@/store';
import { Button } from '@/components';

export const SiderFooter = () => {
    const isCollapsed = useAppStore((s) => s.leftResizablePanel.isCollapsed);
    return (
        <div className='h-48 p-4'>
            <Button className='w-full justify-start' variant='ghost' size={isCollapsed ? 'icon' : undefined}>
                <User size={16} />
                User
            </Button>
        </div>
    );
};
