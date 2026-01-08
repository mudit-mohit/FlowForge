import React from 'react';
import BaseNode from './BaseNode';

export const MathNode = ({ id, data }) => {
  const fields = [
    { key: 'operation', label: 'Operation', type: 'select', options: ['Add', 'Subtract', 'Multiply', 'Divide'], default: data?.operation || 'Add' },
    { key: 'operand', label: 'Operand', default: data?.operand || '1' },
  ];

  const handles = [
    { id: 'a', type: 'target', style: { top: '30%' } },
    { id: 'b', type: 'target', style: { top: '60%' } },
    { id: 'out', type: 'source' },
  ];

  return <BaseNode id={id} data={data} title="Math" fields={fields} handles={handles} />;
};

export default MathNode;
