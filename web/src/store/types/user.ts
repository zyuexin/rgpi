export type Theme = 'system' | 'light' | 'dark';

export type Expired = number;
export type Email = string;

/** 后台返回的用户信息 */
export type UserInfo = {
    id: string;
    name: string;
    email: string;
    avatar: string;
    lang: string;
    theme: Theme;
    createdAt: string;
    updatedAt: string;
};

/** 后台返回的验证码信息 */
export type CaptchInfo = {
    sendAt: number;
    expiration: Expired;
};

/** 前端使用的验证码倒计时使用的验证码状态 */
export type CaptchState = CaptchInfo & {
    loading: boolean;
    countdown?: number;
    countdownInterval?: number;
};

/**
 * 1.调用注册接口时往后台传的参数
 * 2.前端注册页面表单使用
 */
export type RegisterInfo = {
    email: Email;
    nickname: string;
    password: string;
    captcha: string;
};

/**
 * 1.调用登录接口时往后台传的参数
 * 2.前端登录页面表单使用
 */
export type LoginInfo = {
    email: Email;
    password: string;
};

/** 前端使用的用户信息状态 */
export type UserState = {
    registerLoading: boolean;
    registerInfo: RegisterInfo;
    loginLoading: boolean;
    loginInfo: LoginInfo;
    userInfo: UserInfo;
    captcha: CaptchState;
};

export type UserActions = {
    // 发送验证码
    sendCaptcha: (email: string) => Promise<void>;
    // 重置验证码倒计时
    resetCaptchaCountdown?: () => void;
    // 注册新用户
    doRegister: (registerInfo: RegisterInfo) => Promise<void>;
    // 用户登录
    doLogin: (loginInfo: LoginInfo) => Promise<void>;
};

export type UserStore = UserState & UserActions;
