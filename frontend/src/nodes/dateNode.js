import React from 'react';
import BaseNode from './BaseNode';

export const DateNode = ({ id, data }) => {
  const fields = [
    { key: 'format', label: 'Format', default: data?.format || 'YYYY-MM-DD' },
  ];

  const handles = [
    { id: 'out', type: 'source' },
  ];

  return <BaseNode id={id} data={data} title="Date" fields={fields} handles={handles} />;
};

export default DateNode;
