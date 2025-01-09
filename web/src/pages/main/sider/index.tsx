import { Separator } from '@/components';
import { ModuleSwitcher } from './moduleswitcher';
import { SiderFooter } from './footer';
import { Menu } from './menu';

export default function Sider() {
    return (
        <div className='h-full w-full flex flex-col'>
            <ModuleSwitcher />
            <Separator />
            <Menu />
            <Separator />
            <SiderFooter />
        </div>
    );
}
