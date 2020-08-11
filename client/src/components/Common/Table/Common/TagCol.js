import React from 'react';
import * as S from '../style';
import * as T from '../../Typography';
import camelToWords from '../../../../helpers/camelToWords';
import { BOOKING, APPROVAL, PAYMENT } from '../../../../constants/statusTypes';
import Icon from '../../Icon';

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
      <S.WrappedAction>
        <S.Tag type={decideStatusType(type, text)}>
          <T.PXSBold caps color="white">
            {text}
          </T.PXSBold>
        </S.Tag>
        {text === 'awaiting cancellation' && (
          <T.Link
            caps
            to="/"
            color={BOOKING[text]}
            ml={2}
            mt={2}
            style={{ display: 'flex', alignItems: 'center' }}
          >
            please review!
            <Icon
              icon="arrow2"
              width="15px"
              height="15px"
              margin="0 0 2px 10px"
            />
          </T.Link>
        )}
        {text === 'cancelled after payment' && (
          <T.Link caps to="/" color={BOOKING[text]}>
            view details
            <Icon
              icon="arrow2"
              width="15px"
              height="15px"
              margin="0 0 2px 10px"
            />
          </T.Link>
        )}
      </S.WrappedAction>
    ) : (
      <T.PXS color="black">N/A</T.PXS>
    ),
});

export default TagCol;
