import React, { useState, useEffect } from 'react';
import moment from 'moment';
import Table from '../../../../Common/Table';
import {
  LinkCol,
  StandardCol,
  InputCol,
  DropdownCol,
} from '../../../../Common/Table/Common';
import ButtonNew from '../../../../Common/ButtonNew';
import { Row, Col } from '../../../../Common/Grid';

import renderExpandedSection from './renderExpandedSection';

import { ADMIN_USER_DETAILS } from '../../../../../constants/navRoutes';

// DUMMY DATA TO BE REPLACED ONCE BACK END CONNECTED
const dummyData = [
  {
    name: 'Test Name',
    typeOfUser: 'New',
    dateRequested: moment(),
    bursaryPoints: null,
    id: 1,
    type: 'Updated address',
    email: 'test@test.com',
    rejectedBursaries: 0,
    awardedBursariesCost: 840,
  },
];

const selectOptions = ['Pre-approve', 'Reject'].map(option => ({
  label: option,
  value: option,
}));

const Requests = ({ sendToResponse }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const updateBursaryPoints = (e, rowData) => {
    const { id } = rowData;
    const points = e.target.value;
    console.log('function to udpate user with new bursary points', points, id);
  };

  const exportData = () =>
    console.log('function to export all bursary data for these requests');

  const columns = [
    LinkCol('name', ADMIN_USER_DETAILS, 'id'),
    StandardCol('typeOfUser'),
    StandardCol('dateRequested', 'date'),
    InputCol('bursaryPoints', null, updateBursaryPoints),
    DropdownCol('approvalAction', sendToResponse, selectOptions),
  ];

  useEffect(() => {
    setLoading(true);
    setData(dummyData);
    setLoading(false);
  }, []);

  return (
    <>
      <Table
        columns={columns}
        data={data}
        expandedSection={renderExpandedSection}
        loading={loading}
      />
      <Row mt={5}>
        <Col w={[4, 4, 4]}>
          <ButtonNew type="secondary" outline onClick={exportData}>
            Export bursary data
          </ButtonNew>
        </Col>
      </Row>
    </>
  );
};

export default Requests;
