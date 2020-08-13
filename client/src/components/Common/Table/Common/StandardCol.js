import React from 'react';
import * as T from '../../Typography';
import camelToWords from '../../../../helpers/camelToWords';
import { formatPrice, createSingleDate } from '../../../../helpers';
import Icon from '../../Icon';

const formatText = (text, type) => {
  switch (type) {
    case 'date':
      return createSingleDate(text);
    case 'price':
      return formatPrice(text);
    case 'perc':
      return `${text}%`;
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
    case 'perc':
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
        <T.PXS color="black" style={{ textTransform: 'capitalize' }}>
          {text ? formatText(text, type) : 'N/A'}
        </T.PXS>
      </div>
      {subtitle && (
        <T.PXS color="lightGray" style={{ textTransform: 'capitalize' }}>
          {text ? formatText(rowData[subtitle], subtitleType) : 'N/A'}
        </T.PXS>
      )}
    </>
  ),
});

export default StandardCol;
