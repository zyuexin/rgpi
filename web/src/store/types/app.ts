export enum LeftPanelCollapsedSource {
    ResizeHandler,
    CallapsedCallback
}

export type AppState = {
    leftResizablePanel: {
        defaultSize: number;
        collapsedSize: number;
        collapsible: boolean;
        mnSize: number;
        maxSize: number;
        isCollapsed: boolean;
    };
};

export type AppAction = {
    setLeftPanleIsCollapsed(collapsed: boolean, source?: LeftPanelCollapsedSource): void;
};

export type AppStore = AppState & AppAction;
