import React from 'react';
import { cn } from '@/utils/utils';
import { Button } from '@/components/button';
import { Input } from '@/components/input';
import { Label } from '@/components/label';

function Login() {
    const [isLoading, setIsLoading] = React.useState<boolean>(false);

    async function onSubmit(event: React.SyntheticEvent) {}

    return (
        <div className={cn('grid gap-6')}>
            <form onSubmit={onSubmit}>
                <div className='grid gap-2'>
                    <div className='grid gap-1'>
                        <Label className='sr-only' htmlFor='email'>
                            Email
                        </Label>
                        <Input
                            id='email'
                            placeholder='name@example.com'
                            type='email'
                            autoCapitalize='none'
                            autoComplete='email'
                            autoCorrect='off'
                            disabled={isLoading}
                        />
                    </div>
                    <Button disabled={isLoading} loading={isLoading}>
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
