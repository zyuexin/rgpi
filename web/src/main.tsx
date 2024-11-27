import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import router from './router';
import { Toaster } from '@/components/sonner';
import './styles/index.less';

const browserRouter = createBrowserRouter(router);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <>
        <Toaster />
        <RouterProvider router={browserRouter} />
    </>
);
