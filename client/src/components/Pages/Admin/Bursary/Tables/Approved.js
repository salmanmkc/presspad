import React from 'react';
import Table from '../../../../Common/Table';
import { LinkCol, StandardCol } from '../../../../Common/Table/Common';

import renderExpandedSection from './renderExpandedSection';

import { ADMIN_USER_DETAILS } from '../../../../../constants/navRoutes';
import { useGetApplications } from '../utils';

const Approved = () => {
  const { data, loading } = useGetApplications('approved');

  const columns = [
    LinkCol('name', ADMIN_USER_DETAILS, 'id'),
    StandardCol('typeOfUser'),
    StandardCol('dateRequested', 'date'),
    StandardCol('bursaryPoints'),
    StandardCol('totalPotentialAmount', 'price'),
    StandardCol('totalSpentSoFar', 'price'),
    StandardCol('endDate', 'date'),
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

export default Approved;
