import React, { useEffect, useState } from 'react';
import axios from 'axios';

import { Row, Col } from '../../../Common/Grid';
import Table from '../../../Common/Table';
import { LinkCol, StandardCol, TagCol } from '../../../Common/Table/Common';
import * as T from '../../../Common/Typography';
import Tabs from '../../../Common/Tabs';

import { API_ADMIN_STATS_URL } from '../../../../constants/apiRoutes';
import { ADMIN_USER_DETAILS } from '../../../../constants/navRoutes';

const tabs = ['approved', 'approval requests'];

const AdminInterns = () => {
  console.log('hey');
  const [interns, setInterns] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [selected, setSelected] = useState(0);

  const approvedCols = [
    LinkCol('name', ADMIN_USER_DETAILS, 'id'),
    StandardCol('nextPayment', 'price', null, 'nextPaymentDue', 'date'),
    StandardCol('internshipStart', 'date'),
    StandardCol('organisation'),
    TagCol('bookingStatus', 'booking'),
  ];

  const handleTab = e => {
    setSelected(e);
  };

  useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
      try {
        const data = await axios.post(API_ADMIN_STATS_URL, {
          userType: 'interns',
        });
        console.log('da', data.data);
        setInterns(data.data);
      } catch (err) {
        let errorMsg = 'Something went wrong';
        if (err.response && err.response.status !== 500) {
          errorMsg = err.response.data.error;
        }
        setErrors({ serverErr: errorMsg });
      }
    };
    fetchData();
    setLoading(false);
  }, []);

  const renderTable = () => {
    switch (selected) {
      case 0:
        return <Table data={interns} columns={approvedCols} showSearch />;
      //   case 1:
      //     return <Requests data={interns} />;
      default:
        return null;
    }
  };

  return (
    <>
      <Row mb={6}>
        <Col w={[4, 10, 10]}>
          <T.H2 color="blue">Interns</T.H2>
        </Col>
      </Row>
      <Row mb={4}>
        <Col w={[4, 12, 12]}>
          <Tabs items={tabs} caps handleClick={handleTab} selected={selected} />
        </Col>
      </Row>
      <Row mb={4}>
        <Col w={[4, 12, 12]}>{renderTable()}</Col>
      </Row>
    </>
  );
};

export default AdminInterns;
