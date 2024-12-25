import { FC, PropsWithChildren } from 'react';
import { useRouteLoaderData } from 'react-router-dom';
import Page403 from './page403';

/** @todo 权限路由怎么弄 */
const Permission: FC<PropsWithChildren<{ ignorePermission?: boolean }>> = (props) => {
    // 这个root是我们在前面路由中定义了 id: 'root'
    const hasToken = useRouteLoaderData('root');
    const { children } = props;
    if (props.ignorePermission || hasToken) {
        return children;
    }
    return <Page403 />;
};

export default Permission;
