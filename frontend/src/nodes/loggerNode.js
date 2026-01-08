import React from 'react';
import BaseNode from './BaseNode';

export const LoggerNode = ({ id, data }) => {
  const fields = [
    { key: 'level', label: 'Level', type: 'select', options: ['info', 'warn', 'error'], default: data?.level || 'info' },
  ];

  const handles = [
    { id: 'in', type: 'target' },
  ];

  return <BaseNode id={id} data={data} title="Logger" fields={fields} handles={handles} />;
};

export default LoggerNode;
