import { Suspense } from 'react';
import { Loading } from '@/components';
import Permission from './permission';

const LazyLoad = (Component: React.LazyExoticComponent<() => JSX.Element>, ignorePermission?: boolean) => {
    return (
        <Permission ignorePermission={ignorePermission}>
            <Suspense
                fallback={
                    <div className='flex justify-center items-center w-full h-full'>
                        <Loading className='text-lg' />
                    </div>
                }
            >
                <Component />
            </Suspense>
        </Permission>
    );
};

export default LazyLoad;
