import { lazy } from 'react';
import { type RouteObject, type LoaderFunction } from 'react-router-dom';
import LazyLoad from './lazy';
import CookieUtil from '@/utils/cookie';
import Page404 from './page404';

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

const SystemMonitor = LazyLoad(lazy(() => import('@/pages/main/system/monitor')));
const SystemLogs = LazyLoad(lazy(() => import('@/pages/main/system/logsquery')));
const ToolkitNotes = LazyLoad(lazy(() => import('@/pages/main/toolkit/notes')));
const ToolkitTodos = LazyLoad(lazy(() => import('@/pages/main/toolkit/todos')));

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
        children: [
            {
                path: 'system',
                children: [
                    { path: 'monitor', element: SystemMonitor },
                    { path: 'logs', element: SystemLogs }
                ]
            },
            {
                path: 'toolkit',
                children: [
                    { path: 'todos', element: ToolkitTodos },
                    { path: 'notes', element: ToolkitNotes }
                ]
            },
            {
                path: 'storage',
                children: [
                    { path: 'substorage1', element: <div>substorage1...</div> },
                    { path: 'substorage2', element: <div>substorage2...</div> }
                ]
            }
        ]
    },
    {
        path: '*',
        element: <Page404 />
    }
] as RouteObject[];
