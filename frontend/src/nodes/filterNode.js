import React from 'react';
import BaseNode from './BaseNode';

export const FilterNode = ({ id, data }) => {
  const fields = [
    { key: 'condition', label: 'Condition', default: data?.condition || 'contains' },
    { key: 'value', label: 'Value', default: data?.value || '' },
  ];

  const handles = [
    { id: 'in', type: 'target' },
    { id: 'out', type: 'source' },
  ];

  return <BaseNode id={id} data={data} title="Filter" fields={fields} handles={handles} />;
};

export default FilterNode;
