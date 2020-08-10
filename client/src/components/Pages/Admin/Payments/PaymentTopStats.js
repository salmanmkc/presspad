import React from 'react';
import { Popover } from 'antd';
import * as S from '../AdminDashboard.style';
import * as T from '../../../Common/Typography';
import { formatPrice } from '../../../../helpers';

const PaymentTopStats = ({ data, loading }) => {
  if (loading) return <T.PBold align="center">loading top stats ... </T.PBold>;

  const {
    account: { hostingIncome = 0, bursaryFunds = 0 },
    hostsBalance = 0,
    orgsBalance = 0,
    presspadPendingIncome = 0,
    stripeBalance: { available = {}, pending = {} },
    unusedCoupons = 0,
  } = data;

  return (
    <S.TopStatsContainer>
      <S.TopStatsPaymentWrapper>
        <S.Stat>
          <T.PBold align="center" color="blue">
            Current Stripe Account Balance
          </T.PBold>
          <Popover
            content={`available: £${formatPrice(
              available[0].amount,
            )} / pending £${formatPrice(pending[0].amount)}`}
          >
            <T.PXL color="lightBlue">£{formatPrice(available[0].amount)}</T.PXL>
          </Popover>
        </S.Stat>
        <S.Stat>
          <T.PBold align="center" color="blue">
            Confirmed PressPad Income
          </T.PBold>
          <T.PXL color="lightBlue">
            £{formatPrice(hostingIncome - presspadPendingIncome)}
          </T.PXL>
        </S.Stat>
        <S.Stat>
          <T.PBold align="center" color="blue">
            Total Bursary Fund
          </T.PBold>
          <T.PXL color="lightBlue">£{formatPrice(bursaryFunds)}</T.PXL>
        </S.Stat>
        <S.Stat>
          <T.PBold align="center" color="blue">
            Currently in Host Wallets
          </T.PBold>
          <T.PXL color="lightBlue">£{formatPrice(hostsBalance)}</T.PXL>
        </S.Stat>
        <S.Stat>
          <T.PBold align="center" color="blue">
            Currently in Organisation Wallets
          </T.PBold>
          <Popover content={`unused coupons £${formatPrice(unusedCoupons)}`}>
            <T.PXL color="lightBlue">£{formatPrice(orgsBalance)}</T.PXL>
          </Popover>
        </S.Stat>
      </S.TopStatsPaymentWrapper>
    </S.TopStatsContainer>
  );
};
export default PaymentTopStats;
