import React from 'react';
import * as T from '../../Typography';
import camelToWords from '../../../../helpers/camelToWords';
import { Input } from '../../Inputs';

const InputCol = (colTitle, onChange) => ({
  title: camelToWords(colTitle),
  dataIndex: colTitle,
  key: colTitle,
  className: 'dropdownCol',
  render: (text, rowData) =>
    text ? (
      <T.PXS color="black">{text}</T.PXS>
    ) : (
      <Input onChange={e => onChange(e, rowData)} />
    ),
});

export default InputCol;
