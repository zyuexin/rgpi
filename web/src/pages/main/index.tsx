import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from '@/components';
import Sider from './sider/sider';
import useAppStore from '@/store/app';
import { useRef } from 'react';

export default function Content() {
    const resizablePanelRef = useRef<any>(null);
    const { leftResizablePanel, setLeftPanleIsCollapsed } = useAppStore();

    return (
        <main className='h-full min-h-[800px]'>
            <ResizablePanelGroup direction='horizontal'>
                <ResizablePanel
                    ref={resizablePanelRef}
                    collapsible
                    defaultSize={leftResizablePanel.defaultSize}
                    collapsedSize={leftResizablePanel.collapsedSize}
                    minSize={leftResizablePanel.mnSize}
                    maxSize={leftResizablePanel.maxSize}
                    onCollapse={() => void setLeftPanleIsCollapsed(true)}
                    onResize={() => void setLeftPanleIsCollapsed(false)}
                >
                    <Sider />
                </ResizablePanel>
                <ResizableHandle
                    withHandle
                    onDoubleClick={() => void resizablePanelRef.current?.[leftResizablePanel.isCallapsed ? 'expand' : 'collapse']()}
                />
                <ResizablePanel defaultSize={80} minSize={30}>
                    456
                </ResizablePanel>
            </ResizablePanelGroup>
        </main>
    );
}
