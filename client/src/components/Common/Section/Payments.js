import React from 'react';
import Table from '../Table';
import {
  StandardCol,
  BoldDateCol,
  TagCol,
  PayButtonCol,
} from '../Table/Common';

import { PAYMENTS_URL } from '../../../constants/navRoutes';

const Payments = ({ type, payments, handleClick }) => {
  const recentColumns = [
    BoldDateCol('date'),
    StandardCol('intern'),
    StandardCol('earnings', 'price'),
  ];

  const columns = [
    BoldDateCol('dueDate'),
    StandardCol('amount', 'price'),
    TagCol('status', 'payment'),
    PayButtonCol('', handleClick, null, 'pay'),
  ];

  return (
    <Table
      columns={type === 'recent' ? recentColumns : columns}
      data={payments}
      previewLink={PAYMENTS_URL}
      previewLinkText="View all payments"
      previewAlign="right"
      tableHeader={type === 'recent' ? 'Recent Payments' : 'Your Payments'}
      showImage="money"
    />
  );
};

export default Payments;
