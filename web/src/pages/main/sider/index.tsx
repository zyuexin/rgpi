import { Separator } from '@/components';
import { ModuleSwitcher } from './moduleswitcher';
import { Menu } from './menu';

export default function Sider() {
    return (
        <div className='h-full w-full'>
            <div className='flex h-[64px] items-center justify-center px-4'>
                <ModuleSwitcher />
            </div>
            <Separator />
            <Menu />
        </div>
    );
}
