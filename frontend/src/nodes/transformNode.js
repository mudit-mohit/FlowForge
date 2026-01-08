import React from 'react';
import BaseNode from './BaseNode';

export const TransformNode = ({ id, data }) => {
  const fields = [
    { key: 'script', label: 'Script', default: data?.script || 'return input;' },
  ];

  const handles = [
    { id: 'in', type: 'target' },
    { id: 'out', type: 'source' },
  ];

  return <BaseNode id={id} data={data} title="Transform" fields={fields} handles={handles} />;
};

export default TransformNode;
