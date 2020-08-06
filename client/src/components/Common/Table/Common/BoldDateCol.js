import React from 'react';
import moment from 'moment';
import * as T from '../../Typography';
import camelToWords from '../../../../helpers/camelToWords';
import formatPrice from '../../../../helpers/formatPrice';

const BoldDateCol = (colTitle, customSort) => ({
  title: camelToWords(colTitle),
  dataIndex: colTitle,
  key: colTitle,
  sorter: (a, b) => customSort || a[colTitle] - b[colTitle],
  className: 'boldDateCol',
  render: (text, rowData) => (
    <>
      <T.PXS color="black">
        {text ? moment(text).format('DD MMM') : 'N/A'}
      </T.PXS>
    </>
  ),
});

export default BoldDateCol;
