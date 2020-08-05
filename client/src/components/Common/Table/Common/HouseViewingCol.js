import React from 'react';
import * as T from '../../Typography';
import * as S from '../style';
import camelToWords from '../../../../helpers/camelToWords';
import { createSingleDate } from '../../../../helpers';
import Icon from '../../Icon';

const HouseViewingCol = (colTitle, onAdd, onCancel) => ({
  title: camelToWords(colTitle),
  dataIndex: colTitle,
  key: colTitle,
  className: 'houseViewingCol',
  render: (text, rowData) => (
    <>
      {text ? (
        <S.HouseViewing>
          <T.PXS color="black">{createSingleDate(text)}</T.PXS>
          <S.StyledBtn noMargin onClick={() => onCancel(rowData)}>
            <Icon icon="cross" color="pink" width="20px" height="20px" />
          </S.StyledBtn>
        </S.HouseViewing>
      ) : (
        <S.StyledBtn noMargin onClick={() => onAdd(rowData)}>
          <T.PXSBold color="pink">Add</T.PXSBold>
        </S.StyledBtn>
      )}
    </>
  ),
});

export default HouseViewingCol;
