import React from 'react';
import Highlighter from 'react-highlight-words';
import * as S from '../style';
import * as T from '../../Typography';
import { colors } from '../../../../theme';

const StandardCol = (colTitle, customSort) => ({
  title: colTitle,
  dataIndex: colTitle,
  key: colTitle,
  sorter: (a, b) => customSort || a[colTitle].localeCompare(b[colTitle]),
  className: 'linkCol',
  render: (text, rowData) => <T.PXS color="black">{text}</T.PXS>,
});

export default StandardCol;
