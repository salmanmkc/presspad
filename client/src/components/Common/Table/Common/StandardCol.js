import React from 'react';
import * as T from '../../Typography';
import camelToWords from '../../../../helpers/camelToWords';
import formatPrice from '../../../../helpers/formatPrice';

import { createSingleDate } from '../../../../helpers';

const formatText = (text, type) => {
  switch (type) {
    case 'date':
      return createSingleDate(text);
    case 'price':
      return formatPrice(text);
    default:
      return text;
  }
};

const decideSort = (a, b, colTitle, type) => {
  switch (type) {
    case 'date':
      return a[colTitle] - b[colTitle];
    case 'price':
      return a[colTitle] - b[colTitle];
    default:
      return a[colTitle].localeCompare(b[colTitle]);
  }
};

const StandardCol = (colTitle, type, customSort, subtitle, subtitleType) => ({
  title: camelToWords(colTitle),
  dataIndex: colTitle,
  key: colTitle,
  sorter: (a, b) => customSort || decideSort(a, b, colTitle, type),
  className: 'standardCol',
  render: (text, rowData) => (
    <>
      <T.PXS color="black">{formatText(text, type)}</T.PXS>
      {subtitle && (
        <T.PXS color="lightGray">
          {formatText(rowData[subtitle], subtitleType)}
        </T.PXS>
      )}
    </>
  ),
});

export default StandardCol;
