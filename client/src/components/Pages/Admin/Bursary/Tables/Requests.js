import React from 'react';
import { CSVLink } from 'react-csv';

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
import { useGetApplications } from '../utils';

const selectOptions = ['Pre-approve', 'Reject'].map(option => ({
  label: option,
  value: option,
}));

const Requests = ({ sendToResponse }) => {
  const {
    data,
    loading,
    updateBursaryPoints,
    onChangeBursaryPoints,
    getCsvData,
    csvData,
    csvRef,
  } = useGetApplications('request');

  const columns = [
    LinkCol('name', ADMIN_USER_DETAILS, 'id'),
    StandardCol('typeOfUser'),
    StandardCol('dateRequested', 'date'),
    InputCol('bursaryPoints', onChangeBursaryPoints, updateBursaryPoints),
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
          <ButtonNew
            type="secondary"
            outline
            onClick={(event, done) => {
              getCsvData(done);
            }}
          >
            Export bursary data
          </ButtonNew>
          <div style={{ display: 'none' }}>
            <CSVLink data={csvData} ref={csvRef}>
              <ButtonNew type="secondary" outline>
                Export bursary data
              </ButtonNew>
            </CSVLink>
          </div>
        </Col>
      </Row>
    </>
  );
};

export default Requests;
