import { ResizablePanel, ResizableHandle } from '@/components';
import TodoGroup from './group';
import { useAppStore } from '@/store';

function ToolkitTodos() {
    const leftResizablePanel = useAppStore((s) => s.leftResizablePanel);
    return (
        <>
            <ResizablePanel defaultSize={100 - leftResizablePanel.defaultSize - 48} minSize={20} /* collapsedSize={15} */ maxSize={40}>
                <TodoGroup />
            </ResizablePanel>
            <ResizableHandle withHandle />
            <ResizablePanel>
                <div>页面、功能照着浏览器标签页抄</div>
            </ResizablePanel>
        </>
    );
}

export default ToolkitTodos;
