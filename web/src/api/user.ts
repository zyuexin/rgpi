import { RegisterInfo, Email, CaptchInfo, LoginInfo, UserInfo } from '@/store';
import request, { AxiosResponse } from './request';

export const sendCaptcha = async (email: Email) => {
    const defaultResponse = { sendAt: 0, expiration: 0 };
    if (!email) return defaultResponse;
    const res = (await request.get<CaptchInfo>(`/user/captcha?email=${email}`)) as CaptchInfo;
    return res || defaultResponse;
};

export const register = async <T extends AxiosResponse>(info: RegisterInfo) => {
    const res = await request.post<undefined>('/user/register', info, { shouldReturnFullResponse: true });
    return res as T;
};

export const login = async (info: LoginInfo) => {
    const res = await request.post<UserInfo>('/user/login', info);
    return res as UserInfo;
};
