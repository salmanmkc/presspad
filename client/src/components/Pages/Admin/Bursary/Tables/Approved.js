import React, { useState, useEffect } from 'react';
import moment from 'moment';
import Table from '../../../../Common/Table';
import { LinkCol, StandardCol } from '../../../../Common/Table/Common';

import renderExpandedSection from './renderExpandedSection';

import { ADMIN_USER_DETAILS } from '../../../../../constants/navRoutes';

// DUMMY DATA TO BE REPLACED ONCE BACK END CONNECTED
const dummyData = [
  {
    name: 'Test Name',
    typeOfUser: 'New',
    dateRequested: moment(),
    bursaryPoints: 400,
    id: 1,
    type: 'Updated address',
    email: 'test@test.com',
    rejectedBursaries: 0,
    awardedBursariesCost: 840,
    totalPotentialAmount: 600,
    totalSpentSoFar: 200,
    endDate: moment().add(200, 'days'),
  },
];

const Approved = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const columns = [
    LinkCol('name', ADMIN_USER_DETAILS, 'id'),
    StandardCol('typeOfUser'),
    StandardCol('dateRequested', 'date'),
    StandardCol('bursaryPoints'),
    StandardCol('totalPotentialAmount', 'price'),
    StandardCol('totalSpentSoFar', 'price'),
    StandardCol('endDate', 'date'),
  ];

  useEffect(() => {
    setLoading(true);
    setData(dummyData);
    setLoading(false);
  }, []);

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
