import React from 'react';
import * as T from '../../Typography';
import camelToWords from '../../../../helpers/camelToWords';
import formatPrice from '../../../../helpers/formatPrice';
import Icon from '../../Icon';

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
    case 'number':
      return a[colTitle] - b[colTitle];
    default:
      return a[colTitle].localeCompare(b[colTitle]);
  }
};

const decideIcon = text => {
  switch (text) {
    case 'successful':
      return (
        <Icon
          icon="circleTick"
          width="20px"
          height="20px"
          color="lightBlue"
          margin="0 5px 0 0"
        />
      );
    case 'unsuccessful':
      return (
        <Icon
          icon="crossCircle"
          width="20px"
          height="20px"
          color="pink"
          margin="0 5px 0 0"
        />
      );
    default:
      return null;
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
      <div style={{ display: 'flex' }}>
        {decideIcon(text)}
        <T.PXS
          color="black"
          style={{ textTransform: colTitle !== 'email' && 'capitalize' }}
        >
          {formatText(text, type)}
        </T.PXS>
      </div>
      {subtitle && (
        <T.PXS color="lightGray" style={{ textTransform: 'capitalize' }}>
          {formatText(rowData[subtitle], subtitleType)}
        </T.PXS>
      )}
    </>
  ),
});

export default StandardCol;
