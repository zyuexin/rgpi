import { useEffect } from 'react';
import useMenuStore from '@/store/menu';
import LargeMenu from './lgmenu';
import SmMenu from './smmenu';

export default function HeaderLeft() {
    const { getRootMenus } = useMenuStore();
    useEffect(() => {
        getRootMenus();
    }, []);
    return (
        <div className='header-left'>
            <LargeMenu />
            <SmMenu />
        </div>
    );
}
