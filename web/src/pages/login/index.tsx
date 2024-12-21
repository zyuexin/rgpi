import { Link, Outlet } from 'react-router-dom';
import { Shell } from 'lucide-react';
import { cn } from '@/utils/utils';
import { buttonVariants } from '@/components/button';

export const metadata: any = {
    title: 'Authentication',
    description: 'Authentication forms built using the components.'
};

export default function AuthenticationPage() {
    console.log('aaa', 123);
    return (
        <div className='container relative hidden h-full flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0'>
            <Link
                to='/examples/authentication'
                className={cn(buttonVariants({ variant: 'ghost' }), 'absolute right-4 top-4 md:right-8 md:top-8')}
            >
                Login
            </Link>
            <div className='relative hidden h-full flex-col bg-muted p-10 text-white dark:border-r lg:flex bg-zinc-900 justify-between'>
                <div className='relative z-20 flex items-center text-lg font-medium'>
                    <Shell />
                    Rpigo Inc
                </div>
                <div className='w-[90%] self-center'>
                    <img src='/images/login-backimage.png' alt='' className='rounded-md' />
                </div>
                <div className='relative z-20'>
                    <blockquote className='space-y-2'>
                        <p className='text-lg'>&ldquo;Live for today. Tommorrows never come&rdquo;</p>
                        <footer className='text-sm'>zinc</footer>
                    </blockquote>
                </div>
            </div>
            <div className='lg:p-8'>
                <div className='mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]'>
                    <div className='flex flex-col space-y-2 text-center'>
                        <h1 className='text-2xl font-semibold tracking-tight'>Create an account</h1>
                        <p className='text-sm text-muted-foreground'>Enter your email below to create your account</p>
                    </div>
                    <Outlet />
                </div>
            </div>
        </div>
    );
}
