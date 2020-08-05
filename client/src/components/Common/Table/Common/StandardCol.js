import React from 'react';
import * as T from '../../Typography';
import camelToWords from '../../../../helpers/camelToWords';

import { createSingleDate } from '../../../../helpers';

const formatText = (text, type) => {
  switch (type) {
    case 'date':
      return createSingleDate(text);
    default:
      return text;
  }
};

const StandardCol = (colTitle, type, customSort) => ({
  title: camelToWords(colTitle),
  dataIndex: colTitle,
  key: colTitle,
  sorter: (a, b) => customSort || a[colTitle].localeCompare(b[colTitle]),
  className: 'standardCol',
  render: (text, rowData) => (
    <T.PXS color="black">{formatText(text, type)}</T.PXS>
  ),
});

export default StandardCol;
