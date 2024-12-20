export type SendCaptcha_Request = string;

export type SendCaptcha_Response = {
    sendAt: number;
    expired: number;
};
