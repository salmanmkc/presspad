import React from 'react';
import * as S from '../style';
import * as T from '../../Typography';
import camelToWords from '../../../../helpers/camelToWords';
import { Input } from '../../Inputs';
import Icon from '../../Icon';

const BankDetailsCol = (colTitle, onChange, onSubmit) => ({
  title: camelToWords(colTitle),
  dataIndex: colTitle,
  key: colTitle,
  className: 'bankDetailsCol',
  render: (text, rowData) =>
    text ? (
      <S.HouseViewing>
        <T.PXS color="black">{text}</T.PXS>
        <S.StyledBtn noMargin onClick={() => onSubmit(rowData, 'delete')}>
          <Icon icon="cross" color="pink" width="20px" height="20px" />
        </S.StyledBtn>
      </S.HouseViewing>
    ) : (
      <>
        <Input onChange={e => onChange && onChange(e, rowData)} />
        <S.StyledBtn noMargin onClick={() => onSubmit(rowData, 'add')}>
          <T.PXSBold color="pink" mt={1} ml={3}>
            Add
          </T.PXSBold>
        </S.StyledBtn>
      </>
    ),
});

export default BankDetailsCol;
