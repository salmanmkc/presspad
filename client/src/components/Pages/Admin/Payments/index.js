import React, { useEffect, useState } from 'react';
import axios from 'axios';

import { Row, Col } from '../../../Common/Grid';
import Table from '../../../Common/Table';
import { LinkCol, StandardCol } from '../../../Common/Table/Common';
import * as T from '../../../Common/Typography';

import { API_ADMIN_STATS_URL } from '../../../../constants/apiRoutes';
import { ADMIN_USER_DETAILS } from '../../../../constants/navRoutes';

import TopStats from './TopStats';

const AdminPayments = () => {
  console.log('hey');
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errors, setErrors] = useState({});

  const columns = [
    LinkCol('organisation', ADMIN_USER_DETAILS, 'id'),
    StandardCol('totalPayments', 'price'),
    StandardCol('currentBalance', 'price'),
    StandardCol('interns', 'number'),
    StandardCol('currentlyHosting', 'number'),
  ];

  useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
      try {
        const data = await axios.post(API_ADMIN_STATS_URL, {
          userType: 'payments',
        });
        setClients(data.data);
        setLoading(false);
      } catch (err) {
        let errorMsg = 'Something went wrong';
        if (err.response && err.response.status !== 500) {
          errorMsg = err.response.data.error;
        }
        setErrors({ serverErr: errorMsg });
      }
    };
    fetchData();
  }, []);

  return (
    <>
      <Row mb={6}>
        <Col w={[4, 10, 10]}>
          <T.H2 color="blue">Payments</T.H2>
        </Col>
      </Row>
      <Row mb={6}>
        <Col w={[4, 12, 12]}>
          <TopStats data={clients} loading={loading} />
        </Col>
      </Row>
      {/* <Table columns={columns} data={clients} loading={loading} showSearch /> */}
    </>
  );
};

export default AdminPayments;
