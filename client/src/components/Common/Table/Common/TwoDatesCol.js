import React from 'react';
import * as T from '../../Typography';
import camelToWords from '../../../../helpers/camelToWords';

import { createSingleDate } from '../../../../helpers';

const TwoDatesCol = colTitle => ({
  title: camelToWords(colTitle),
  dataIndex: colTitle,
  key: colTitle,
  className: 'standardCol',
  render: (text, rowData) => (
    <T.PXS color="black" style={{ textTransform: 'capitalize' }}>
      {createSingleDate(rowData.startDate)} -{' '}
      {createSingleDate(rowData.endDate)}
    </T.PXS>
  ),
});

export default TwoDatesCol;
