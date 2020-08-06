import React from 'react';
import Table from '../Table';
import { StandardCol, BoldDateCol } from '../Table/Common';
import * as S from './style';

import { PAYMENTS_URL } from '../../../constants/navRoutes';

const Payments = ({ type, payments }) => {
  if (type === 'recent') {
    const columns = [
      BoldDateCol('date'),
      StandardCol('intern'),
      StandardCol('earnings', 'price'),
    ];

    return (
      <Table
        columns={columns}
        data={payments}
        previewLink={PAYMENTS_URL}
        previewLinkText="View all payments"
        previewAlign="right"
        tableHeader="Recent Payments"
        showImage="money"
      />
    );
  }
};

export default Payments;
