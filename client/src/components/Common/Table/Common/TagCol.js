import React from 'react';
import * as S from '../style';
import * as T from '../../Typography';
import camelToWords from '../../../../helpers/camelToWords';
import { BOOKING, APPROVAL, PAYMENT } from '../../../../constants/statusTypes';
import Icon from '../../Icon';
import { Select } from '../../Inputs';

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

const TagCol = (colTitle, type, handleAction) => ({
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
          <S.StyledBtn
            caps
            onClick={() => handleAction(rowData, text)}
            color={BOOKING[text]}
            style={{
              display: 'flex',
              alignItems: 'center',
              margin: '5px 0 0 10px',
            }}
          >
            <T.PXSBold caps color={BOOKING[text]}>
              please review!
            </T.PXSBold>

            <Icon
              icon="arrow2"
              width="15px"
              height="15px"
              margin="0 0 2px 10px"
              color={BOOKING[text]}
            />
          </S.StyledBtn>
        )}
        {text === 'cancelled after payment' && (
          <S.StyledBtn
            onClick={() => handleAction(rowData, text)}
            color={BOOKING[text]}
            style={{
              display: 'flex',
              alignItems: 'center',
              margin: '5px 0 0 10px',
            }}
          >
            <T.PXSBold caps color={BOOKING[text]}>
              view details
            </T.PXSBold>
            <Icon
              icon="arrow2"
              width="15px"
              height="15px"
              margin="0 0 2px 10px"
              color={BOOKING[text]}
            />
          </S.StyledBtn>
        )}
        {text === 'awaiting admin' && (
          <Select
            options={[
              { label: 'approve', value: 'approve' },
              { label: 'reject', value: 'reject' },
            ]}
            onChange={selected => handleAction(rowData, selected)}
            mt={3}
            style={{ minWidth: '150px' }}
          />
        )}
      </S.WrappedAction>
    ) : (
      <T.PXS color="black">N/A</T.PXS>
    ),
});

export default TagCol;
