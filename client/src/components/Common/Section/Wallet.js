import React from 'react';
import * as S from './style';
import * as T from '../Typography';
import Icon from '../Icon';

import { PAYMENTS_URL } from '../../../constants/navRoutes';

const Wallet = ({ balance, pending }) => (
  <S.Wrapper style={{ minHeight: '240px' }}>
    <T.H7C color="gray">My Wallet</T.H7C>
    <T.H1C style={{ fontSize: '50px' }} color="black">
      £{(balance && balance.toFixed(2)) || 0}
    </T.H1C>
    <T.H5 color="darkerGray">£{pending || 0} pending</T.H5>
    <S.WalletLink to={PAYMENTS_URL}>
      <T.H7C color="black">View wallet</T.H7C>
    </S.WalletLink>
    <S.ImageWrapper>
      <Icon icon="flower" width="auto" height="220" color="secondary" />
    </S.ImageWrapper>
  </S.Wrapper>
);

export default Wallet;
