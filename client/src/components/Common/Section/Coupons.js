import React from 'react';
import Table from '../Table';
import { StandardCol, LinkCol } from '../Table/Common';
import { INTERN_PROFILE } from '../../../constants/navRoutes';

const Coupons = ({ coupons }) => {
  const columns = [
    StandardCol('discountCode', 'code'),
    StandardCol('startDate', 'startDate'),
    StandardCol('endDate', 'endDate'),
    StandardCol('amountSpent', 'usedAmount'),
    StandardCol('totalPotentialCost', 'reservedAmount'),
    LinkCol('intern', INTERN_PROFILE, 'intern._id'),
    StandardCol('status', 'status'),
  ];

  return (
    <Table
      columns={columns}
      data={coupons}
      previewLinkText="View all previous discount codes"
      previewAlign="right"
      tableHeader="Current Intern Discount Codes"
      showImage="money"
    />
  );
};

export default Coupons;
