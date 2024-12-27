import { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { EMAIL_SUFFIX } from '@/utils/constants';
import { REGEXP_ONLY_DIGITS } from 'input-otp';
import { cn } from '@/utils/utils';
import { Button, Input, InputWithAddon, InputOTP, InputOTPGroup, InputOTPSlot } from '@/components';
import QQSVG from '/svg/qq.svg';
import WechatSVG from '/svg/wechat.svg';
import SinaSVG from '/svg/sina.svg';
import { useUserStore, RegisterInfo } from '@/store';

function Register() {
    const { control, handleSubmit, getValues, watch } = useForm<RegisterInfo>();
    const [emailSuffix, setEMailSuffix] = useState<string>(EMAIL_SUFFIX[0]);
    const { captcha, register, registerLoading, sendCaptcha } = useUserStore();

    return (
        <div className={cn('grid gap-6')}>
            <form
                onSubmit={handleSubmit((data) => {
                    register({
                        ...data,
                        email: `${data.email}${emailSuffix}`
                    });
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
                            name='nickname'
                            control={control}
                            rules={{ required: true }}
                            render={({ field }) => <Input {...field} placeholder='nickname' />}
                        />
                        <Controller
                            name='password'
                            control={control}
                            rules={{ required: true }}
                            render={({ field }) => <Input type='password' {...field} placeholder='password' />}
                        />
                        {watch('email') && (
                            <Controller
                                name='captcha'
                                control={control}
                                rules={{ required: true }}
                                render={({ field }) => (
                                    <div className='grid grid-cols-[auto_120px] gap-2'>
                                        <InputOTP {...field} maxLength={6} pattern={REGEXP_ONLY_DIGITS}>
                                            <InputOTPGroup>
                                                {new Array(6).fill(0).map((_, index) => (
                                                    <InputOTPSlot key={index} index={index} />
                                                ))}
                                            </InputOTPGroup>
                                        </InputOTP>
                                        <Button
                                            loading={captcha.loading}
                                            disabled={captcha.countdown! > 0}
                                            onClick={() => void sendCaptcha(getValues('email') + emailSuffix)}
                                            variant='outline'
                                            type='button'
                                        >
                                            {captcha.countdown! > 0 ? <span className='ml-2'>Retry({captcha.countdown})s</span> : 'Get Captcha'}
                                        </Button>
                                    </div>
                                )}
                            />
                        )}
                    </div>
                    <Button type='submit' loading={registerLoading}>
                        Sign up with Email
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
            <div className='others flex justify-around items-center'>
                {[QQSVG, WechatSVG, SinaSVG].map((src) => {
                    return (
                        <Button key={src} variant='outline' type='button' size='icon' disabled>
                            <img src={src} alt='' />
                        </Button>
                    );
                })}
            </div>
        </div>
    );
}
export default Register;
