import { Suspense } from 'react';
import { Loading } from '@/components';
import Permission from './permission';

const LazyLoad = (Component: React.LazyExoticComponent<() => JSX.Element>, ignorePermission?: boolean) => {
    return (
        <Permission ignorePermission={ignorePermission}>
            <Suspense fallback={<Loading />}>
                <Component />
            </Suspense>
        </Permission>
    );
};

export default LazyLoad;
