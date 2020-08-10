import React, { useEffect, useState } from 'react';
import axios from 'axios';

import { Row, Col } from '../../../Common/Grid';
import Table from '../../../Common/Table';
import { LinkCol, StandardCol, TagCol } from '../../../Common/Table/Common';
import * as T from '../../../Common/Typography';

import { API_ADMIN_STATS_URL } from '../../../../constants/apiRoutes';
import { ADMIN_USER_DETAILS } from '../../../../constants/navRoutes';

const AdminHosts = () => {
  console.log('hey');
  const [hosts, setHosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const columns = [
    LinkCol('name', ADMIN_USER_DETAILS, 'id'),
    StandardCol('location'),
    StandardCol('internsHosted', 'number'),
    StandardCol('wallet', 'price'),
    StandardCol('earnings', 'price'),
    TagCol('bookingStatus', 'booking'),
  ];

  useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
      try {
        const data = await axios.post(API_ADMIN_STATS_URL, {
          userType: 'hosts',
        });
        console.log('da', data.data);
        setHosts(data.data);
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

  return (
    <>
      <Row mb={6}>
        <Col w={[4, 10, 10]}>
          <T.H2 color="blue">Hosts</T.H2>
        </Col>
      </Row>
      <Table columns={columns} data={hosts} loading={loading} showSearch />
    </>
  );
};

export default AdminHosts;
