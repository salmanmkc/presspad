import React from 'react';
import camelToWords from '../../../../helpers/camelToWords';
import { Input } from '../../Inputs';

const InputCol = (colTitle, onChange, onBlur) => ({
  title: camelToWords(colTitle),
  dataIndex: colTitle,
  key: colTitle,
  className: 'dropdownCol',
  render: (text, rowData) => (
    <Input
      onChange={e => onChange && onChange(e, rowData)}
      onBlur={e => onBlur && onBlur(e, rowData)}
      defaultValue={text}
      error={rowData.error}
    />
  ),
});

export default InputCol;
