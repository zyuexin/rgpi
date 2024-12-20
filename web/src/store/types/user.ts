export type Theme = 'system' | 'light' | 'dark';

export type UserInfo = {
    id: string;
    name: string;
    email: string;
    avatar: string;
    theme: Theme;
    createdAt: string;
    updatedAt: string;
};

type Expired = number;

export type CaptchInfo = {
    sendAt: number;
    expired: Expired;
};

export type UserState = {
    user: UserInfo;
    captcha: CaptchInfo;
};

export type UserActions = {
    sendCaptcha: (email: string) => Promise<CaptchInfo>;
};

export type UserStore = UserState & UserActions;
