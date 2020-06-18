import React from 'react';

import WalletBox from './WalletBox';
import InfoBox from './InfoBox';

import * as T from '../../../Common/Typography';

import * as S from './style';

const HostPayments = () => (
  <S.Wrapper>
    <T.H2C>your payments</T.H2C>
    <T.PS mt={4}>
      This is where you can view all payments received and due through your
      PressPad hosting. You can also decide whether to withdraw your earnings or
      donate to PressPad to help continue our work.
    </T.PS>
    <T.PS mt={6}>
      Please remember that payments for a booking will only be available to
      withdraw once that booking is complete.
    </T.PS>
    <S.CardsWrapper>
      <WalletBox />
      <InfoBox />
    </S.CardsWrapper>
  </S.Wrapper>
);

export default HostPayments;
