import React from 'react';
import Figure from '../../../Common/Figure';
import { Row } from '../../../Common/Grid';
import LoadingBallPulseSync from '../../../Common/LoadingBallPulseSync';
import formatPrice from '../../../../helpers/formatPrice';

const PaymentTopStats = ({ data, loading }) => {
  if (loading) return <LoadingBallPulseSync />;

  const {
    account: { hostingIncome = 0, bursaryFunds = 0 },
    hostsBalance = 0,
    orgsBalance = 0,
    presspadPendingIncome = 0,
    stripeBalance: { available = {}, pending = {} },
    unusedCoupons = 0,
  } = data;

  return (
    <Row jc="space-between" jcT="flex-start">
      <Figure
        stats={formatPrice(available[0].amount)}
        title="stripe balance"
        small
        popoverContent={`available: ${formatPrice(
          available[0].amount / 100,
        )} / pending ${formatPrice(pending[0].amount / 100)}`}
        maxWidth="25%"
        mr={3}
        mb={3}
      />
      <Figure
        stats={formatPrice((hostingIncome - presspadPendingIncome) / 100)}
        title="confirmed PressPad income"
        small
        mr={3}
        mb={3}
        maxWidth="25%"
      />
      <Figure
        stats={formatPrice(bursaryFunds / 100)}
        title="bursary fund"
        small
        mr={3}
        mb={3}
        maxWidth="25%"
      />
      <Figure
        stats={formatPrice(hostsBalance / 100)}
        title="host wallets"
        small
        mr={3}
        mb={3}
        maxWidth="25%"
      />
      <Figure
        stats={formatPrice(orgsBalance / 100)}
        title="organisation credit"
        small
        popoverContent={`unused coupons ${formatPrice(unusedCoupons / 100)}`}
        maxWidth="25%"
      />
    </Row>
  );
};
export default PaymentTopStats;
