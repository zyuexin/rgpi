import { Separator } from '@/components';

export default function TodoGroup() {
    return (
        <div className='h-full flex flex-col'>
            <div className='flex h-[52px] items-center justify-start px-4'>
                <h1 className='text-xl font-bold'></h1>
            </div>
            <Separator />
            <div className='flex-1 px-4 py-2'></div>
        </div>
    );
}
