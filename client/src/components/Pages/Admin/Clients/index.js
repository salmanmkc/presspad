import React, { useEffect, useState } from 'react';
import axios from 'axios';

import { Row, Col } from '../../../Common/Grid';
import Table from '../../../Common/Table';
import { LinkCol, StandardCol } from '../../../Common/Table/Common';
import * as T from '../../../Common/Typography';

import { API_ADMIN_STATS_URL } from '../../../../constants/apiRoutes';
import { ADMIN_USER_DETAILS } from '../../../../constants/navRoutes';

const AdminClients = () => {
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const columns = [
    LinkCol('organisation', ADMIN_USER_DETAILS, 'id'),
    StandardCol('totalPayments', 'price'),
    StandardCol('currentBalance', 'price'),
    StandardCol('interns', 'number'),
    StandardCol('currentlyHosting', 'number'),
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await axios.post(API_ADMIN_STATS_URL, {
          userType: 'clients',
        });
        setClients(data.data);
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
          <T.H2 color="blue">Clients</T.H2>
        </Col>
      </Row>
      <Table columns={columns} data={clients} loading={loading} showSearch />
      {error && (
        <Row>
          <T.PXS color="pink">{error}</T.PXS>
        </Row>
      )}
    </>
  );
};

export default AdminClients;
