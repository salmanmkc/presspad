import React, { useState, useEffect } from 'react';
import axios from 'axios';

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
import {
  API_BURSARY_APPLICATIONS,
  API_UPDATE_BURSARY_APPLICATIONS,
} from '../../../../../constants/apiRoutes';

const selectOptions = ['Pre-approve', 'Reject'].map(option => ({
  label: option,
  value: option,
}));

const Requests = ({ sendToResponse }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [fetchData, setFetchData] = useState(0);

  const updateBursaryPoints = async (e, rowData) => {
    const { _id } = rowData;
    const bursaryPoints = e.target.value;
    if (bursaryPoints) {
      try {
        await axios.patch(
          `${API_UPDATE_BURSARY_APPLICATIONS.replace(':id', _id)}`,
          { bursaryPoints },
          { params: { type: 'update-points' } },
        );
        setFetchData(count => count + 1);
      } catch (error) {
        if (error.response && error.response.data) {
          setData(oldState =>
            oldState.map(row => {
              if (row._id === _id) {
                return {
                  ...row,
                  error: error.response.data.error,
                };
              }
              return row;
            }),
          );
        }
      }
    }
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
    let mounted = true;
    async function getBursaryApplications() {
      setLoading(true);

      const { data: _data } = await axios.get(
        `${API_BURSARY_APPLICATIONS}?type=request`,
      );

      if (mounted) {
        setData(_data);
        setLoading(false);
      }
    }

    getBursaryApplications();
    return () => {
      mounted = false;
    };
  }, [fetchData]);

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
