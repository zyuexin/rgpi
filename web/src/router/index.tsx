import { lazy } from 'react';
import App from '@/App';
import type { RouteObject } from 'react-router-dom';
import lazyLoad from './lazy';

const Auth = lazyLoad(lazy(() => import('@/pages/login')));
const Register = lazyLoad(lazy(() => import('@/pages/login/register')));
const Login = lazyLoad(lazy(() => import('@/pages/login/login')));

function unknownReactRouterLoader() {
    console.log('arguments', arguments);
    return null;
}

export default [
    {
        path: 'auth',
        element: Auth,
        loader: unknownReactRouterLoader,
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
        Component: App,
        loader: unknownReactRouterLoader,
        children: []
    }
] as RouteObject[];
