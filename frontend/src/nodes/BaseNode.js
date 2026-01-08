import React, { useState, useEffect } from 'react';
import { Handle, Position } from 'reactflow';

export const BaseNode = ({ id, data = {}, title = 'Node', fields = [], handles = [], style = {}, onFieldChange: parentOnFieldChange, children }) => {
  // initialize local state for each field from node data or default
  const initState = {};
  fields.forEach((f) => {
    initState[f.key] = data[f.key] ?? f.default ?? '';
  });

  const [values, setValues] = useState(initState);

  // keep local state in sync if data changes externally
  useEffect(() => {
    const newState = {};
    fields.forEach((f) => {
      newState[f.key] = data[f.key] ?? f.default ?? '';
    });
    setValues((prev) => ({ ...prev, ...newState }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [JSON.stringify(data)]);

  const onFieldChange = (key, val) => {
    setValues((v) => ({ ...v, [key]: val }));
    if (typeof parentOnFieldChange === 'function') {
      parentOnFieldChange(key, val);
    }
  };

  return (
    <div className="base-node" data-node-id={id} style={style}>
      {handles
        .filter((h) => h.type === 'target')
        .map((h, i) => (
          <Handle
            key={`t-${i}`}
            type="target"
            position={Position.Left}
            id={`${id}-${h.id}`}
            style={h.style}
          />
        ))}

      <div className="base-node__title">{title}</div>

      <div className="base-node__fields">
        {children ? (
          children
        ) : (
          fields.map((f) => (
            <div key={f.key} className="base-node__field">
              <label className="base-node__label">
                <span className="base-node__label-text">{f.label}</span>
                {f.type === 'select' ? (
                  <select className="base-node__select" value={values[f.key]} onChange={(e) => onFieldChange(f.key, e.target.value)}>
                    {(f.options || []).map((opt) => (
                      <option key={opt} value={opt}>{opt}</option>
                    ))}
                  </select>
                ) : f.type === 'textarea' ? (
                  <textarea
                    className="base-node__textarea"
                    value={values[f.key]}
                    onChange={(e) => onFieldChange(f.key, e.target.value)}
                  />
                ) : (
                  <input
                    className="base-node__input"
                    type={f.type || 'text'}
                    value={values[f.key]}
                    onChange={(e) => onFieldChange(f.key, e.target.value)}
                  />
                )}
              </label>
            </div>
          ))
        )}
      </div>

      {handles
        .filter((h) => h.type === 'source')
        .map((h, i) => (
          <Handle
            key={`s-${i}`}
            type="source"
            position={Position.Right}
            id={`${id}-${h.id}`}
            style={h.style}
          />
        ))}
    </div>
  );
};

export default BaseNode;
