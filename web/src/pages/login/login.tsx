import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm, Controller, useWatch } from 'react-hook-form';
import { EMAIL_SUFFIX } from '@/utils/constants';
import { cn } from '@/utils/utils';
import { Button } from '@/components/button';
import { Input } from '@/components/input';
import { InputWithAddon } from '@/components';
import { LoginInfo, useUserStore } from '@/store';

function Login() {
    const navigate = useNavigate();
    const [emailSuffix, setEMailSuffix] = useState<string>(EMAIL_SUFFIX[0]);
    const { loginLoading, loginInfo, doLogin, updateLoginInfo } = useUserStore();
    const { control, handleSubmit } = useForm({
        values: loginInfo
    });
    const watchedField = useWatch({ control });

    useEffect(() => {
        updateLoginInfo(watchedField as LoginInfo);
    }, [watchedField]);

    return (
        <div className={cn('grid gap-6')}>
            <form
                onSubmit={handleSubmit(async (data) => {
                    const succescs = await doLogin({
                        ...data,
                        email: `${data.email}${emailSuffix}`
                    });
                    if (succescs) {
                        navigate('/', { replace: true });
                    }
                })}
            >
                <div className='grid gap-2'>
                    <div className='grid gap-1'>
                        <Controller
                            name='email'
                            control={control}
                            rules={{ required: true }}
                            render={({ field }) => (
                                <InputWithAddon
                                    {...field}
                                    placeholder='email'
                                    afterSelections={EMAIL_SUFFIX}
                                    afterValue={emailSuffix}
                                    afterAddonOnChange={setEMailSuffix}
                                />
                            )}
                        />
                        <Controller
                            name='password'
                            control={control}
                            rules={{ required: true }}
                            render={({ field }) => <Input {...field} type='password' placeholder='password' />}
                        />
                    </div>
                    <Button type='submit' disabled={loginLoading} loading={loginLoading}>
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
            <Button variant='outline' type='button' disabled>
                GitHub
            </Button>
        </div>
    );
}
export default Login;
