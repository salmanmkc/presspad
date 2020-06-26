import React from 'react';
import * as S from '../AdminDashboard.style';
import * as T from '../../../Common/Typography';

const PaymentTopStats = ({ data, loading }) => (
  <S.TopStatsContainer>
    <S.TopStatsPaymentWrapper>
      <S.Stat>
        <T.PBold align="center" color="blue">
          Current Stripe Account Balance
        </T.PBold>
        <T.PXL color="lightBlue">£14000</T.PXL>
      </S.Stat>
      <S.Stat>
        <T.PBold align="center" color="blue">
          Confirmed PressPad Income
        </T.PBold>
        <T.PXL color="lightBlue">£14000</T.PXL>
      </S.Stat>
      <S.Stat>
        <T.PBold align="center" color="blue">
          Total Bursary Fund
        </T.PBold>
        <T.PXL color="lightBlue">£14000</T.PXL>
      </S.Stat>
      <S.Stat>
        <T.PBold align="center" color="blue">
          Currently in Host Wallets
        </T.PBold>
        <T.PXL color="lightBlue">£14000</T.PXL>
      </S.Stat>
      <S.Stat>
        <T.PBold align="center" color="blue">
          Currently in Organisation Wallets
        </T.PBold>
        <T.PXL color="lightBlue">£14000</T.PXL>
      </S.Stat>
    </S.TopStatsPaymentWrapper>
  </S.TopStatsContainer>
);

export default PaymentTopStats;
