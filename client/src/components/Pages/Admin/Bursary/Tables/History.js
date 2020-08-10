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
    totalSpent: 200,
    applicationStatus: 'successful',
  },
];

const History = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const columns = [
    LinkCol('name', ADMIN_USER_DETAILS, 'id'),
    StandardCol('applicationStatus'),
    StandardCol('totalAmountSpent', 'price'),
    StandardCol('bursaryPoints', 'number'),
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

export default History;
