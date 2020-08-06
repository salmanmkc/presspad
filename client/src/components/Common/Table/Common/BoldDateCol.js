import React from 'react';
import moment from 'moment';
import * as T from '../../Typography';
import camelToWords from '../../../../helpers/camelToWords';

const BoldDateCol = (colTitle, customSort) => ({
  title: camelToWords(colTitle),
  dataIndex: colTitle,
  key: colTitle,
  sorter: (a, b) => customSort || a[colTitle] - b[colTitle],
  className: 'boldDateCol',
  render: (text, rowData) => (
    <>
      <T.PXSBold caps color="darkGray">
        {text ? moment(text).format('DD MMM') : 'N/A'}
      </T.PXSBold>
    </>
  ),
});

export default BoldDateCol;
