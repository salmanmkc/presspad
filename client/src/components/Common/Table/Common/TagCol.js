import React from 'react';
import * as S from '../style';
import * as T from '../../Typography';
import camelToWords from '../../../../helpers/camelToWords';
import { BOOKING, APPROVAL, PAYMENT } from '../../../../constants/statusTypes';

const decideStatusType = (type, text) => {
  switch (type) {
    case 'booking':
      return BOOKING[text];
    case 'profileApproval':
      return APPROVAL[text];
    case 'payment':
      return PAYMENT[text];
    default:
      return null;
  }
};

const TagCol = (colTitle, type) => ({
  title: camelToWords(colTitle),
  dataIndex: colTitle,
  key: colTitle,
  className: 'tagCol',
  sorter: (a, b) => a[colTitle].localeCompare(b[colTitle]),
  render: (text, rowData) =>
    text ? (
      <S.Tag type={decideStatusType(type, text)}>
        <T.PXSBold caps color="white">
          {text}
        </T.PXSBold>
      </S.Tag>
    ) : (
      <T.PXS color="black">N/A</T.PXS>
    ),
});

export default TagCol;
