import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import type { UserState, UserStore } from './types/user';
import { register, sendCaptcha } from '@/api/user';

const INITIAL_APP_STATE: UserState = {
    registerLoading: false,
    user: {
        id: '',
        name: '',
        email: '',
        avatar: '',
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
        register: async (registerInfo) => {
            const res = await register(registerInfo);
            console.log('res', res);
        }
    }))
);

export default useUserStore;
