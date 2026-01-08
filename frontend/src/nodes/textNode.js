import React, { useState, useEffect, useMemo, useRef } from 'react';
import { useStore } from '../store';
import BaseNode from './BaseNode';

const VAR_RE = /{{\s*([A-Za-z_$][A-Za-z0-9_$]*)\s*}}/g;

export const TextNode = ({ id, data }) => {
  const initial = data?.text || '{{input}}';
  const [text, setText] = useState(initial);
  const updateNodeField = useStore((s) => s.updateNodeField);

  useEffect(() => {
    setText(data?.text ?? initial);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [JSON.stringify(data)]);

  // parse variables from text
  const vars = useMemo(() => {
    const found = new Set();
    let m;
    while ((m = VAR_RE.exec(text))) {
      found.add(m[1]);
    }
    return Array.from(found);
  }, [text]);

  // build handles: targets for each variable, plus an output
  const handles = useMemo(() => {
    const hs = vars.map((v, i) => ({ id: `var-${v}`, type: 'target', style: { top: `${(i + 1) * 100 / (vars.length + 1)}%` } }));
    hs.push({ id: 'output', type: 'source' });
    return hs;
  }, [vars]);

  // compute size based on longest line / rows
  const style = useMemo(() => {
    const lines = text.split('\n');
    const longest = lines.reduce((max, l) => Math.max(max, l.length), 0);
    const charsPerLine = 28;
    const rows = Math.max(lines.length, Math.ceil(longest / charsPerLine));
    const width = Math.min(520, Math.max(220, Math.min(28 * Math.min(longest || 1, 60), 520)));
    const base = 64;
    const height = Math.min(420, base + rows * 20);
    return { width: `${width}px`, minHeight: `${height}px` };
  }, [text]);

  

  const textareaRef = useRef(null);

  const adjustHeights = () => {
    const ta = textareaRef.current;
    if (!ta) return;
    ta.style.height = 'auto';
    const h = ta.scrollHeight;
    ta.style.height = h + 'px';
    // set container minHeight a bit larger than textarea to include title/spacing
    setContainerStyle({ width: style.width, minHeight: `${h + 60}px` });
  };

  useEffect(() => {
    adjustHeights();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [text, textareaRef.current]);

  const [containerStyle, setContainerStyle] = useState(style);

  const onFieldChange = (key, val) => {
    if (key === 'text') {
      setText(val);
      if (typeof updateNodeField === 'function') {
        updateNodeField(id, 'text', val);
      }
    }
  };

  const textAreaElement = (
    <div>
      <label className="base-node__label">
        <span className="base-node__label-text">Text</span>
        <textarea
          ref={textareaRef}
          className="base-node__textarea"
          value={text}
          onChange={(e) => {
            onFieldChange('text', e.target.value);
          }}
        />
      </label>
    </div>
  );

  return <BaseNode id={id} data={{ text }} title="Text" fields={[]} handles={handles} style={containerStyle} onFieldChange={onFieldChange}>{textAreaElement}</BaseNode>;
};

export default TextNode;
