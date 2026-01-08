export const DraggableNode = ({ type, label }) => {
  const onDragStart = (event, nodeType) => {
    const appData = { nodeType };
    event.dataTransfer.setData('application/reactflow', JSON.stringify(appData));
    event.dataTransfer.effectAllowed = 'move';
  };

  return (
    <div
      className={`toolbar-item ${type}`}
      onDragStart={(event) => onDragStart(event, type)}
      onDragEnd={(event) => (event.target.style.cursor = 'grab')}
      draggable
    >
      <div style={{display:'flex', alignItems:'center'}}>
        <div className="toolbar-item__icon">📦</div>
        <div className="toolbar-item__label">{label}</div>
      </div>
    </div>
  );
};
  