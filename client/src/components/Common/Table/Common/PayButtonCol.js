import React from 'react';
import * as T from '../../Typography';
import * as S from '../style';
import camelToWords from '../../../../helpers/camelToWords';
import Icon from '../../Icon';
import ButtonNew from '../../ButtonNew';

const PayButtonCol = (colTitle, handleClick1, handleClick2, type) => ({
  title: camelToWords(colTitle),
  dataIndex: colTitle,
  key: colTitle,
  className: 'buttonCol',
  render: (text, rowData) => {
    // SINGLE PAY BUTTON
    if (type === 'pay') {
      const { status } = rowData;

      if (status !== 'paid') {
        return (
          <ButtonNew
            type="tertiary"
            bgColor="pink"
            onClick={() => {
              // recalculate price to cents
              // eslint-disable-next-line no-param-reassign
              rowData.amount *= 100;
              handleClick1({ openModal: true, installment: rowData });
            }}
            style={{ minWidth: '60px', height: '30px', fontSize: '14px' }}
          >
            Pay
          </ButtonNew>
        );
      }
      return null;
    }

    // PAID CANCELLED BUTTONS
    const { bankName, accountNumber, sortCode } = rowData;
    if (text === 'transfered')
      return (
        <T.PXSBold caps color="lightBlue">
          paid
        </T.PXSBold>
      );

    if (text === 'cancelled')
      return (
        <T.PXSBold caps color="pink">
          cancelled
        </T.PXSBold>
      );

    if (bankName && accountNumber && sortCode)
      return (
        <>
          <S.StyledBtn onClick={() => handleClick2(rowData, 'cancelled')}>
            <Icon
              icon="crossCircle"
              color="pink"
              width="20px"
              height="20px"
              margin="0 5px 0 0"
            />
            <T.PXSBold caps color="pink">
              cancel
            </T.PXSBold>
          </S.StyledBtn>
          <S.StyledBtn onClick={() => handleClick2(rowData, 'transfered')}>
            <Icon
              icon="circleTick"
              color="lightBlue"
              width="20px"
              height="20px"
              margin="0 5px 0 0"
            />
            <T.PXSBold caps color="lightBlue">
              paid
            </T.PXSBold>
          </S.StyledBtn>
        </>
      );
    return (
      <S.StyledBtn onClick={() => handleClick1(rowData, 'save')}>
        <T.PXSBold caps color="darkBlue">
          save details
        </T.PXSBold>
      </S.StyledBtn>
    );
  },
});

export default PayButtonCol;
