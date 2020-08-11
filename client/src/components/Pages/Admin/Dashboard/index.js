import React, { useEffect, useState } from 'react';
import axios from 'axios';

import { Row, Col } from '../../../Common/Grid';

import * as T from '../../../Common/Typography';

import AdminInterns from '../Interns';
import AdminHosts from '../Hosts';

import { API_ADMIN_STATS_URL } from '../../../../constants/apiRoutes';
import { ADMIN_USER_DETAILS } from '../../../../constants/navRoutes';

import TopStats from './TopStats';

// DUMMY DATA FOR THE STATS
const dummyData = {
  userName: 'Olivia',
  interns: 442,
  hosts: 323,
  approvalRequests: 44,
  liveBookings: 63,
  bookingRequests: 13,
};

const AdminDashboard = () => {
  const [topData, setTopData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
      try {
        setTopData(dummyData);
        setLoading(false);
      } catch (err) {
        let errorMsg = 'Something went wrong';
        if (err.response && err.response.status !== 500) {
          errorMsg = err.response.data.error;
        }
        setError(errorMsg);
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <>
      <Row mb={6}>
        <Col w={[4, 10, 10]}>
          <T.H2 color="blue">Welcome {topData.userName}</T.H2>
        </Col>
      </Row>
      <Row mb={6}>
        <Col w={[4, 12, 12]}>
          <TopStats data={dummyData} loading={loading} />
        </Col>
      </Row>
      <div style={{ marginBottom: '40px' }}>
        <AdminInterns preview />
      </div>
      <AdminHosts preview />
      {error && (
        <Row>
          <T.PXS color="pink">{error}</T.PXS>
        </Row>
      )}
    </>
  );
};

export default AdminDashboard;
