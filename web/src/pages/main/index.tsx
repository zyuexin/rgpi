import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from '@/components';
import Sider from './sider';
import { useAppStore } from '@/store';
import { useRef } from 'react';

export default function Content() {
    const resizablePanelRef = useRef<any>(null);
    const leftResizablePanel = useAppStore((s) => s.leftResizablePanel);
    const setLeftPanleIsCollapsed = useAppStore((s) => s.setLeftPanleIsCollapsed);

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
                    onDoubleClick={() => void resizablePanelRef.current?.[leftResizablePanel.isCollapsed ? 'expand' : 'collapse']()}
                />
                <ResizablePanel defaultSize={80} minSize={30}>
                    1.server： TODO管理
                    <br />
                    2.web：TODO页面，用shadcnui的mail模板实现，找一个shadcnui风格的web编辑器，比如tiptap之类的。
                    <br />
                    3.server：查询出菜单后按order排下序
                    <br />
                    4.server：维护下TODO的菜单sql
                </ResizablePanel>
            </ResizablePanelGroup>
        </main>
    );
}
