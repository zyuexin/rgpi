import { Link, Outlet, useLocation } from 'react-router-dom';
import { Shell } from 'lucide-react';
import { cn } from '@/utils/utils';
import { buttonVariants } from '@/components/button';
import { useMemo } from 'react';

export const metadata: any = {
    title: 'Authentication',
    description: 'Authentication forms built using the components.'
};

export default function AuthenticationPage() {
    const location = useLocation();

    const pageInfo = useMemo(() => {
        if (location.pathname === '/user/login') {
            return {
                title: 'Login to your account use email',
                desc: 'Enter your email below to login',
                type: 'To Register',
                to: '/user/register'
            };
        }
        return {
            title: 'Create an account use email',
            desc: 'Enter your email below to create an account',
            type: 'To Login',
            to: '/user/login'
        };
    }, [location]);

    return (
        <div className='relative w-full h-full min-h-[400px]'>
            <Link to={pageInfo.to} className={cn(buttonVariants({ variant: 'ghost' }), 'absolute right-4 top-4 md:right-8 md:top-8')}>
                {pageInfo.type}
            </Link>
            <div className='grid grid-cols-1 grid-rows-1 lg:grid-cols-2 h-full'>
                <div className='relative hidden h-full flex-col bg-muted p-10 text-white dark:border-r lg:flex bg-zinc-900 justify-between'>
                    <div className='relative z-20 flex items-center text-lg font-medium'>
                        <Shell />
                        Rpigo Inc
                    </div>
                    <div className='w-[90%] self-center'>
                        <img src='/images/login-backimage.png' className='rounded-md' />
                    </div>
                    <div className='relative z-20'>
                        <blockquote className='space-y-2'>
                            <p className='text-lg'>&ldquo;Live for today. Tommorrows never come&rdquo;</p>
                            <footer className='text-sm'>zinc</footer>
                        </blockquote>
                    </div>
                </div>
                <div className='p-8 self-center'>
                    <div className='mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]'>
                        <div className='flex flex-col space-y-2 text-center'>
                            <h1 className='text-2xl font-semibold tracking-tight'>{pageInfo.title}</h1>
                            <p className='text-sm text-muted-foreground'>{pageInfo.desc}</p>
                        </div>
                        <Outlet />
                    </div>
                </div>
            </div>
        </div>
    );
}
