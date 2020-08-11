import React from 'react';
import * as S from '../style';
import * as T from '../../Typography';
import camelToWords from '../../../../helpers/camelToWords';
import { BOOKING, APPROVAL, PAYMENT } from '../../../../constants/statusTypes';

const TagCol = colTitle => ({
  title: camelToWords(colTitle),
  dataIndex: colTitle,
  key: colTitle,
  className: 'tagCol',
  sorter: (a, b) => a[colTitle].localeCompare(b[colTitle]),
  render: (text, rowData) =>
    text ? (
      <>
        <S.Tag type={BOOKING[text]}>
          <T.PXSBold caps color="white">
            {text}
          </T.PXSBold>
        </S.Tag>
        {text === 'cancelled after payment' && (
          <T.Link caps to="/" color={BOOKING[text]}>
            please review!
          </T.Link>
        )}
      </>
    ) : (
      <T.PXS color="black">N/A</T.PXS>
    ),
});

export default TagCol;
