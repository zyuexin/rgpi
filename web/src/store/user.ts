import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import type { UserState, UserStore, LoginInfo } from './types/user';
import { register, login, sendCaptcha, getUserInfo, updateUserInfo } from '@/api/user';
import { AxiosResponse } from '@/api/request';
import Cookie from '@/utils/cookie';

const INITIAL_USER_STATE: UserState = {
    registerLoading: false,
    registerInfo: {
        email: '',
        nickname: '',
        password: '',
        captcha: ''
    },
    loginLoading: false,
    loginInfo: {
        email: '',
        password: ''
    },
    userInfo: {
        id: '',
        name: '',
        email: '',
        avatar: '',
        lang: 'en_US',
        theme: 'system'
    },
    captcha: {
        loading: false,
        sendAt: 0,
        expiration: 0,
        countdown: 0,
        countdownInterval: undefined
    }
};

const useUserStore = create<UserStore>()(
    immer((set) => ({
        ...INITIAL_USER_STATE,
        sendCaptcha: async (email) => {
            set((s) => {
                s.captcha.loading = true;
            });
            const res = await sendCaptcha(email);
            set((s) => {
                s.captcha = {
                    ...(res || {}),
                    loading: false,
                    countdown: res.expiration
                };
                s.captcha.countdownInterval = setInterval(() => {
                    set((s) => {
                        if ((s.captcha.countdown || 0) > 0) {
                            s.captcha.countdown! -= 1;
                        } else {
                            clearInterval(s.captcha.countdownInterval);
                            s.captcha.countdownInterval = undefined;
                            s.captcha.countdown = 0;
                        }
                    });
                }, 1000);
            });
        },
        resetCaptchaCountdown: () => {
            set((s) => {
                if (s.captcha.countdownInterval) {
                    clearInterval(s.captcha.countdownInterval);
                }
                s.captcha.countdown = 0;
                s.captcha.countdownInterval = undefined;
            });
        },
        updateRegisterInfo: (info) => {
            set((s) => {
                s.registerInfo = info;
            });
        },
        updateLoginInfo: (info) => {
            set((s) => {
                s.loginInfo = info;
            });
        },
        doRegister: async (registerInfo) => {
            set((s) => {
                s.registerLoading = true;
            });
            await register<AxiosResponse<undefined>>(registerInfo);
            set((s) => (s.registerLoading = false));
        },
        doLogin: async (info: LoginInfo) => {
            set((s) => {
                s.loginLoading = true;
            });
            const res = await login(info);
            if (!res) {
                set((s) => {
                    s.loginLoading = false;
                });
                return false;
            }
            const token = Cookie.get('Authorization');
            token && localStorage.setItem('token', token);
            set((s) => {
                s.loginLoading = false;
                s.loginInfo = {
                    email: '',
                    password: ''
                };
                s.userInfo = res || {};
            });
            return true;
        },
        getUserInfo: async (email) => {
            const res = (await getUserInfo(email)) || {};
            set((s) => {
                s.userInfo = res;
            });
            return res;
        },
        updateUserInfo: async (field, value) => {
            const info = { ...useUserStore.getState().userInfo, [field]: value };
            const res = await updateUserInfo(info);
            set((s) => {
                s.userInfo = res || {};
            });
        }
    }))
);

export default useUserStore;
