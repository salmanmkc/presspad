import React from 'react';
import { CSVLink } from 'react-csv';

import Table from '../../../../Common/Table';
import { LinkCol, StandardCol } from '../../../../Common/Table/Common';

import renderExpandedSection from './renderExpandedSection';
import ButtonNew from '../../../../Common/ButtonNew';
import { Row, Col } from '../../../../Common/Grid';

import { ADMIN_USER_DETAILS } from '../../../../../constants/navRoutes';
import { useGetApplications } from '../utils';

const History = () => {
  const { data, loading, getCsvData, csvData, csvRef } = useGetApplications(
    'history',
  );

  const columns = [
    LinkCol('name', ADMIN_USER_DETAILS, 'id'),
    StandardCol('applicationStatus'),
    StandardCol('totalAmountSpent', 'price'),
    StandardCol('bursaryPoints', 'number'),
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

export default History;
