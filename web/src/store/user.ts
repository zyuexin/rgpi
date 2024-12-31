import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import type { UserState, UserStore, LoginInfo } from './types/user';
import { register, login, sendCaptcha } from '@/api/user';
import { AxiosResponse } from '@/api/request';
import Cookie from '@/utils/cookie';

const INITIAL_APP_STATE: UserState = {
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
        theme: 'system',
        createdAt: '',
        updatedAt: ''
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
        ...INITIAL_APP_STATE,
        sendCaptcha: async (email) => {
            set((state) => {
                state.captcha.loading = true;
            });
            const res = await sendCaptcha(email);
            set((state) => {
                state.captcha = {
                    ...(res || {}),
                    loading: false,
                    countdown: res.expiration
                };
                state.captcha.countdownInterval = setInterval(() => {
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
            set((state) => {
                if (state.captcha.countdownInterval) {
                    clearInterval(state.captcha.countdownInterval);
                }
                state.captcha = {
                    ...state.captcha,
                    countdown: 0,
                    countdownInterval: undefined
                };
            });
        },
        updateRegisterInfo: (info) => {
            set((state) => {
                state.registerInfo = info;
            });
        },
        updateLoginInfo: (info) => {
            set((state) => {
                state.loginInfo = info;
            });
        },
        doRegister: async (registerInfo) => {
            set((state) => {
                state.registerLoading = true;
            });
            await register<AxiosResponse<undefined>>(registerInfo);
            set((state) => (state.registerLoading = false));
        },
        doLogin: async (info: LoginInfo) => {
            set((state) => {
                state.loginLoading = true;
            });
            const res = await login(info);
            if (!res) {
                set((state) => {
                    state.loginLoading = false;
                });
                return false;
            }
            const token = Cookie.get('Authorization');
            token && localStorage.setItem('token', token);
            set((state) => {
                state.loginLoading = false;
                state.loginInfo = {
                    email: '',
                    password: ''
                };
                state.userInfo = res || {};
            });
            return true;
        }
    }))
);

export default useUserStore;
