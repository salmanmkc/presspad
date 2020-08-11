import React from 'react';
import Table from '../../../../Common/Table';
import {
  LinkCol,
  StandardCol,
  InputCol,
  DropdownCol,
  InterviewCol,
} from '../../../../Common/Table/Common';
import ButtonNew from '../../../../Common/ButtonNew';
import { Row, Col } from '../../../../Common/Grid';

import renderExpandedSection from './renderExpandedSection';

import { ADMIN_USER_DETAILS } from '../../../../../constants/navRoutes';
import { useGetApplications } from '../utils';

const selectOptions = ['Approve', 'Reject'].map(option => ({
  label: option,
  value: option,
}));

const PreApproved = ({ sendToResponse }) => {
  const { data, loading, updateBursaryPoints } = useGetApplications(
    'pre-approved',
  );

  const inviteToInterview = (rowData, e) =>
    console.log(
      'function to send the user an email and then update database as invited to interview',
    );

  const exportData = () =>
    console.log('function to export all bursary data for these requests');

  const columns = [
    LinkCol('name', ADMIN_USER_DETAILS, 'id'),
    StandardCol('typeOfUser'),
    StandardCol('dateRequested', 'date'),
    InputCol('bursaryPoints', null, updateBursaryPoints),
    InterviewCol('interview', inviteToInterview),
    DropdownCol('approvalAction', sendToResponse, selectOptions),
  ];

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

export default PreApproved;
