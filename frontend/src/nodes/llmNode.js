import React from 'react';
import BaseNode from './BaseNode';

export const LLMNode = ({ id, data }) => {
  const fields = [
    { key: 'model', label: 'Model', default: data?.model || 'gpt-demo' },
  ];

  const handles = [
    { id: 'system', type: 'target', style: { top: '25%' } },
    { id: 'prompt', type: 'target', style: { top: '60%' } },
    { id: 'response', type: 'source' },
  ];

  return <BaseNode id={id} data={data} title="LLM" fields={fields} handles={handles} />;
};

export default LLMNode;
