import React from 'react';
import BaseNode from './BaseNode';

export const OutputNode = ({ id, data }) => {
  const fields = [
    { key: 'outputName', label: 'Name', default: id.replace('customOutput-', 'output_') },
    { key: 'outputType', label: 'Type', type: 'select', options: ['Text', 'Image'], default: data?.outputType || 'Text' },
  ];

  const handles = [
    { id: 'value', type: 'target' },
  ];

  return <BaseNode id={id} data={data} title="Output" fields={fields} handles={handles} />;
};

export default OutputNode;
