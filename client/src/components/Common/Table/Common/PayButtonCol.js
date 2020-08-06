import React from 'react';
import * as T from '../../Typography';
import * as S from '../style';
import camelToWords from '../../../../helpers/camelToWords';
import Icon from '../../Icon';

const PayButtonCol = (colTitle, handleClick) => ({
  title: camelToWords(colTitle),
  dataIndex: colTitle,
  key: colTitle,
  className: 'buttonCol',
  render: (text, rowData) => {
    const { bankName, accountNumber, sortCode } = rowData;
    if (text === 'paid')
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
          <S.StyledBtn onClick={() => handleClick(rowData, 'cancel')}>
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
          <S.StyledBtn onClick={() => handleClick(rowData, 'paid')}>
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
      <S.StyledBtn onClick={() => handleClick(rowData, 'save')}>
        <T.PXSBold caps color="darkBlue">
          save details
        </T.PXSBold>
      </S.StyledBtn>
    );
  },
});

export default PayButtonCol;
