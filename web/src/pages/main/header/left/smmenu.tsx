import { Menu } from 'lucide-react';
import { Button } from '@/components';

export default () => {
    return (
        <Button className='md:hidden' variant='ghost' size='icon'>
            <Menu className='text-sm cursor-pointer' />
        </Button>
    );
};
