import { Suspense } from 'react';
import { Loading } from '@/components';

const lazyLoad = (Component: React.LazyExoticComponent<() => JSX.Element>) => {
    return (
        <Suspense fallback={<Loading />}>
            <Component />
        </Suspense>
    );
};

export default lazyLoad;
