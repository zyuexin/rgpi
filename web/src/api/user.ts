import { RegisterInfo, Email, CaptchState } from '@/store/types/user';
import request from './request';

export const sendCaptcha = async (email: Email) => {
    const defaultResponse = { sendAt: 0, expired: 0 };
    if (!email) return defaultResponse;
    const res = await request.get<CaptchState>(`/user/captcha?email=${email}`);
    return res || defaultResponse;
};

export const register = async (user: RegisterInfo) => {
    if (!user) return;
    const res = await request.post<undefined>('/user/register', user);
    return res;
};
