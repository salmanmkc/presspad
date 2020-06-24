import React from 'react';
import { Card } from 'antd';
import { useTheme } from 'styled-components';

import * as T from '../../../../Common/Typography';
import { formatPrice } from '../../../../../helpers';

import * as S from './style';

const InfoBox = ({ account, internsHosted, withdrawn }) => {
  const theme = useTheme();
  return (
    <Card
      hoverable
      style={{
        width: 410,
        height: 298,
        cursor: 'default',
        backgroundColor: theme.colors.pink,
        borderRadius: 0,
      }}
    >
      <T.H7C color="white">QUICK SUMMARY</T.H7C>
      <S.BallanceWrapper>
        <T.H2>{internsHosted}&nbsp;</T.H2>
        <T.H7C>&nbsp;interns hosted</T.H7C>
      </S.BallanceWrapper>
      <S.BallanceWrapper>
        <T.H2>£{formatPrice(account.income)}&nbsp;</T.H2>
        <T.H7C>&nbsp;earned</T.H7C>
      </S.BallanceWrapper>
      <S.BallanceWrapper>
        <T.H2>£{formatPrice(account.donation)}&nbsp;</T.H2>
        <T.H7C>&nbsp;donated (thank you)</T.H7C>
      </S.BallanceWrapper>
      <S.BallanceWrapper>
        <T.H2>£{formatPrice(withdrawn)}&nbsp;</T.H2>
        <T.H7C>&nbsp;withdrawn</T.H7C>
      </S.BallanceWrapper>
    </Card>
  );
};

export default InfoBox;
