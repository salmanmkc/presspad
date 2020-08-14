import React, { useEffect, useState } from 'react';
import axios from 'axios';

import { Row, Col } from '../../../Common/Grid';

import * as T from '../../../Common/Typography';

import AdminInterns from '../Interns';
import AdminHosts from '../Hosts';

import TopStats from './TopStats';

import { API_TOP_ADMIN_STATS } from '../../../../constants/apiRoutes';

// DUMMY DATA FOR THE STATS
const dummyData = {
  userName: 'Olivia',
  interns: 442,
  hosts: 323,
  approvalRequests: 44,
  liveBookings: 63,
  bookingRequests: 13,
};

const AdminDashboard = ({ name }) => {
  const [topData, setTopData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const getFirstName = () => {
    const firstName = name.split(' ')[0];
    return firstName;
  };

  useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
      try {
        const data = await axios.get(API_TOP_ADMIN_STATS);
        setTopData(data.data);
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
          <T.H2 color="blue">Welcome {name && getFirstName()}</T.H2>
        </Col>
      </Row>
      <Row mb={6}>
        <Col w={[4, 12, 12]}>
          <TopStats data={topData} loading={loading} />
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
