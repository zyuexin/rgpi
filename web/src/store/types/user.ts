export type Theme = 'system' | 'light' | 'dark';

export type Expired = number;
export type Email = string;

export type UserInfo = {
    id: string;
    name: string;
    email: string;
    avatar: string;
    theme: Theme;
    createdAt: string;
    updatedAt: string;
};

export type CaptchInfo = {
    sendAt: number;
    expired: Expired;
};

export type CaptchState = CaptchInfo & {
    loading: boolean;
    sendAt: number;
    expired: Expired;
    countdown?: number;
    countdownInterval?: number;
};

export type UserState = {
    registerLoading: boolean;
    user: UserInfo;
    captcha: CaptchState;
};

export type RegisterInfo = {
    email: Email;
    nickname: string;
    password: string;
    captcha: string;
};

export type UserActions = {
    sendCaptcha: (email: string) => Promise<void>;
    resetCaptchaCountdown?: () => void;
    register: (registerInfo: RegisterInfo) => Promise<void>;
};

export type UserStore = UserState & UserActions;
