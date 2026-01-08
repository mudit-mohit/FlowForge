import React from 'react';
import BaseNode from './BaseNode';

export const InputNode = ({ id, data }) => {
  const fields = [
    { key: 'inputName', label: 'Name', default: id.replace('customInput-', 'input_') },
    { key: 'inputType', label: 'Type', type: 'select', options: ['Text', 'File'], default: data?.inputType || 'Text' },
  ];

  const handles = [
    { id: 'value', type: 'source' },
  ];

  return <BaseNode id={id} data={data} title="Input" fields={fields} handles={handles} />;
};

export default InputNode;
