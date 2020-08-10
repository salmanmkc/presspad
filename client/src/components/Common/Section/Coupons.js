import React from 'react';
import Table from '../Table';
import { StandardCol, LinkCol } from '../Table/Common';
import { INTERN_PROFILE } from '../../../constants/navRoutes';

const Coupons = ({ coupons, previewClickEvent, liveCouponsSrc }) => {
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
      previewClickEvent={previewClickEvent}
      previewLinkText={
        liveCouponsSrc
          ? 'View all previous discount codes'
          : 'View all current discount codes'
      }
      previewAlign="center"
      tableHeader={
        liveCouponsSrc
          ? 'Current Intern Discount Codes'
          : 'Previous Intern Discount Codes'
      }
      showImage="money"
    />
  );
};

export default Coupons;
