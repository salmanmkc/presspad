import React from 'react';
import * as T from '../../Typography';
import * as S from '../style';
import camelToWords from '../../../../helpers/camelToWords';
import { createSingleDate } from '../../../../helpers';
import Icon from '../../Icon';
import { DatePicker } from '../../Inputs';

const HouseViewingCol = (colTitle, onChange, onSubmit) => ({
  title: camelToWords(colTitle),
  dataIndex: colTitle,
  key: colTitle,
  className: 'houseViewingCol',
  render: (text, rowData) => (
    <>
      {text ? (
        <S.HouseViewing>
          <T.PXS color="black">{createSingleDate(text)}</T.PXS>
          <S.StyledBtn noMargin onClick={() => onSubmit(rowData, 'delete')}>
            <Icon icon="cross" color="pink" width="20px" height="20px" />
          </S.StyledBtn>
        </S.HouseViewing>
      ) : (
        <>
          <DatePicker onChange={e => onChange(e, rowData.id)} />
          <S.StyledBtn noMargin onClick={() => onSubmit(rowData, 'add')}>
            <T.PXSBold color="pink" mt={1} ml={3}>
              Add
            </T.PXSBold>
          </S.StyledBtn>
        </>
      )}
    </>
  ),
});

export default HouseViewingCol;
