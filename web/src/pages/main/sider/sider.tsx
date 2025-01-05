import { Separator } from '@/components';
import { FunctionSwitcher } from './functionswitcher';
export default function Sider() {
    return (
        <div className='h-full w-full'>
            <div className='flex h-[52px] items-center justify-center px-4'>
                <FunctionSwitcher />
            </div>
            <Separator />
        </div>
    );
}
