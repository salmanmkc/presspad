import React from 'react';
import Table from '../../../../Common/Table';
import { LinkCol, StandardCol } from '../../../../Common/Table/Common';

import renderExpandedSection from './renderExpandedSection';

import { ADMIN_USER_DETAILS } from '../../../../../constants/navRoutes';
import { useGetApplications } from '../utils';

const History = () => {
  const { data, loading } = useGetApplications('history');

  const columns = [
    LinkCol('name', ADMIN_USER_DETAILS, 'id'),
    StandardCol('applicationStatus'),
    StandardCol('totalAmountSpent', 'price'),
    StandardCol('bursaryPoints', 'number'),
  ];

  return (
    <Table
      columns={columns}
      data={data}
      expandedSection={renderExpandedSection}
      loading={loading}
    />
  );
};

export default History;
