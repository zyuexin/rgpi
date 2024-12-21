import { lazy } from 'react';
import { type RouteObject, type LoaderFunction } from 'react-router-dom';
import LazyLoad from './lazy';
import CookieUtil from '@/utils/cookie';

const Auth = LazyLoad(
    lazy(() => import('@/pages/login')),
    true
);
const Register = LazyLoad(
    lazy(() => import('@/pages/login/register')),
    true
);
const Login = LazyLoad(
    lazy(() => import('@/pages/login/login')),
    true
);

const App = LazyLoad(lazy(() => import('@/App')));

const rootLoader: LoaderFunction = (): boolean => {
    if (!CookieUtil.get(CookieUtil.TOKEN_NAME)) {
        return false;
    }
    return true;
};

export default [
    {
        path: 'user',
        element: Auth,
        children: [
            {
                index: true,
                path: 'login',
                element: Login
            },
            {
                path: 'register',
                element: Register
            }
        ]
    },
    {
        path: '/',
        element: App,
        id: 'root',
        loader: rootLoader,
        children: []
    }
] as RouteObject[];
