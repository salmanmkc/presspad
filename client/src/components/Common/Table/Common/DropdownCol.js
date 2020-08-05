import React from 'react';
import * as T from '../../Typography';
import camelToWords from '../../../../helpers/camelToWords';
import { Select } from '../../Inputs';

const DropdownCol = (colTitle, onChange, options) => ({
  title: camelToWords(colTitle),
  dataIndex: colTitle,
  key: colTitle,
  className: 'dropdownCol',
  render: (text, rowData) => (
    <Select options={options} onChange={onChange} value={text} />
  ),
});

export default DropdownCol;
