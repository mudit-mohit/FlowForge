import { useState } from 'react';
import { DraggableNode } from './draggableNode';

export const PipelineToolbar = () => {
    const [collapsed, setCollapsed] = useState(false);

    return (
        <aside className={`toolbar ${collapsed ? 'toolbar--collapsed' : ''}`}>
            <div className="toolbar__header">
                <div className="toolbar__title">Pipeline</div>
                <button className="toolbar__toggle" onClick={() => setCollapsed((c) => !c)} aria-label="Toggle toolbar">{collapsed ? '➤' : '◀'}</button>
            </div>

            <div className="toolbar__group">
                <DraggableNode type='customInput' label='Input' />
                <DraggableNode type='llm' label='LLM' />
                <DraggableNode type='customOutput' label='Output' />
                <DraggableNode type='text' label='Text' />
            </div>

            <div className="toolbar__group">
                <DraggableNode type='math' label='Math' />
                <DraggableNode type='date' label='Date' />
                <DraggableNode type='filter' label='Filter' />
                <DraggableNode type='transform' label='Transform' />
                <DraggableNode type='logger' label='Logger' />
            </div>
        </aside>
    );
};
