import React from 'react';
import Table from '../Table';
import { StandardCol, LinkCol } from '../Table/Common';
import { INTERN_PROFILE } from '../../../constants/navRoutes';

const Coupons = ({ coupons }) => {
  const columns = [
    { title: 'Discount Code', dataIndex: 'code', key: 'code' },
    StandardCol('startDate'),
    StandardCol('endDate'),
    { title: 'Amount Spent', dataIndex: 'usedAmount', key: 'usedAmount' },
    {
      title: 'Total Potential Cost',
      dataIndex: 'reservedAmount',
      key: 'reservedAmount',
    },

    LinkCol('internName', INTERN_PROFILE, 'id'),
    StandardCol('status'),
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
