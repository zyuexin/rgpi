import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import { LeftPanelCollapsedSource, type AppStore, type AppState } from './types/app';

export { LeftPanelCollapsedSource };

const INITIAL_APP_STATE: AppState = {
    leftResizablePanel: {
        defaultSize: 12,
        collapsedSize: 4,
        collapsible: true,
        mnSize: 8,
        maxSize: 20,
        isCallapsed: false
    }
};

const useAppStore = create<AppStore>()(
    immer((set) => ({
        ...INITIAL_APP_STATE,
        setLeftPanleIsCollapsed: (c) => {
            set((state) => {
                state.leftResizablePanel.isCallapsed = c;
            });
        }
    }))
);

export default useAppStore;
