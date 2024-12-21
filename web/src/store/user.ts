import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import type { UserState, UserStore } from './types/user';
import { sendCaptcha } from '@/api/user';

const INITIAL_APP_STATE: UserState = {
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
        sendAt: 0,
        expired: 0
    }
};

const useUserStore = create<UserStore>()(
    immer((set, get) => ({
        ...INITIAL_APP_STATE,
        sendCaptcha: async (email) => {
            const res = await sendCaptcha(email);
            set((state) => {
                state.captcha = res;
            });
            return res;
        }
    }))
);

export default useUserStore;
