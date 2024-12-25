import React from 'react';
import { cn } from '@/utils/utils';
import { useForm, Controller } from 'react-hook-form';
import { Button } from '@/components/button';
import { Input } from '@/components/input';

function Login() {
    const { control, handleSubmit } = useForm();
    const [isLoading, setIsLoading] = React.useState<boolean>(false);

    return (
        <div className={cn('grid gap-6')}>
            <form
                onSubmit={handleSubmit((data) => {
                    console.log('data', data);
                })}
            >
                <div className='grid gap-2'>
                    <div className='grid gap-1'>
                        <Controller
                            name='email'
                            control={control}
                            rules={{ required: true }}
                            render={({ field }) => <Input {...field} placeholder='email' />}
                        />
                        <Controller
                            name='password'
                            control={control}
                            rules={{ required: true }}
                            render={({ field }) => <Input {...field} placeholder='password' />}
                        />
                    </div>
                    <Button type='submit' disabled={isLoading} loading={isLoading}>
                        Sign In with Email
                    </Button>
                </div>
            </form>
            <div className='relative'>
                <div className='absolute inset-0 flex items-center'>
                    <span className='w-full border-t' />
                </div>
                <div className='relative flex justify-center text-xs uppercase'>
                    <span className='bg-background px-2 text-muted-foreground'>Or continue with</span>
                </div>
            </div>
            <Button variant='outline' type='button' disabled={isLoading} loading={isLoading}>
                GitHub
            </Button>
        </div>
    );
}
export default Login;
