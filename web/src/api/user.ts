import request from './request';
import * as Types from './types/user';

export const sendCaptcha = async (email: Types.SendCaptcha_Request) => {
    const defaultResponse = { sendAt: 0, expired: 0 };
    if (!email) return defaultResponse;
    const res = await request.get<Types.SendCaptcha_Response>(`/user/captcha?email=${email}`);
    return res || defaultResponse;
};
