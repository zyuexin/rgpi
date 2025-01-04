import { Shell } from 'lucide-react';
import { NavLink } from 'react-router-dom';
import useMenuStore from '@/store/menu';

export default () => {
    const { rootMenus } = useMenuStore();
    return (
        <div className='mr-4 hidden md:flex'>
            <div className='logo mr-8 cursor-pointer hover:text-red-300 transition-all'>
                <Shell />
            </div>
            <div className='flex items-center gap-4 text-sm xl:gap-6'>
                {rootMenus.map((i) => (
                    <NavLink defaultChecked to={i.path}>
                        {i.name}
                    </NavLink>
                ))}
            </div>
        </div>
    );
};
