import React from 'react';
import * as T from '../../Typography';
import camelToWords from '../../../../helpers/camelToWords';
import { Input } from '../../Inputs';

const BankDetailsCol = (colTitle, onChange, onBlur) => ({
  title: camelToWords(colTitle),
  dataIndex: colTitle,
  key: colTitle,
  className: 'bankDetailsCol',
  render: (text, rowData) =>
    text ? (
      <T.PXS color="black">{text}</T.PXS>
    ) : (
      <Input
        onChange={e => onChange && onChange(e, rowData)}
        onBlur={e => onBlur && onBlur(e, rowData)}
      />
    ),
});

export default BankDetailsCol;
