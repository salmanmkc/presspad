import React from 'react';
import camelToWords from '../../../../helpers/camelToWords';
import { Select } from '../../Inputs';

const DropdownCol = (colTitle, onChange, options) => ({
  title: camelToWords(colTitle),
  dataIndex: colTitle,
  key: colTitle,
  className: 'dropdownCol',
  render: (text, rowData) => (
    <Select
      options={options}
      onChange={e => onChange(e, rowData)}
      value={text}
    />
  ),
});

export default DropdownCol;
