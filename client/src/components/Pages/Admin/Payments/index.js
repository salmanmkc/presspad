import React, { useEffect, useState } from 'react';
import axios from 'axios';

import { Row, Col } from '../../../Common/Grid';
import Table from '../../../Common/Table';
import {
  LinkCol,
  StandardCol,
  PayButtonCol,
  BankDetailsCol,
} from '../../../Common/Table/Common';
import * as T from '../../../Common/Typography';
import Tabs from '../../../Common/Tabs';

import { API_ADMIN_STATS_URL } from '../../../../constants/apiRoutes';
import { ADMIN_USER_DETAILS } from '../../../../constants/navRoutes';

import TopStats from './TopStats';

import renderExpandedSection from './renderExpandedSection';

const tabs = ['requests', 'history'];

const AdminPayments = () => {
  const [totalPayments, setTotalPayments] = useState([]);
  const [paymentRequests, setPaymentRequests] = useState([]);
  const [paymentHistory, setPaymentHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selected, setSelected] = useState(0);

  const handleTab = e => {
    setSelected(e);
  };

  const updatePaymentStatus = (rowData, statusType) => {
    console.log('func to go here to update payment status');
  };

  const columns = [
    LinkCol('host/intern', ADMIN_USER_DETAILS, 'id'),
    StandardCol('amount', 'price'),
    BankDetailsCol('bankName'),
    BankDetailsCol('accountNumber'),
    BankDetailsCol('sortCode'),
    PayButtonCol('status', updatePaymentStatus),
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await axios.post(API_ADMIN_STATS_URL, {
          userType: 'payments',
        });

        setTotalPayments(data.data);

        const { withdrawRequests } = data.data;
        const requests = [];
        const history = [];

        if (withdrawRequests && withdrawRequests.length > 0) {
          withdrawRequests.forEach(request => {
            if (request.status === 'pending') {
              requests.push(request);
            } else {
              history.push(request);
            }
          });
        }
        setPaymentHistory(history);
        setPaymentRequests(requests);
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

  const renderTable = () => {
    switch (selected) {
      case 0:
        return (
          <Table
            data={paymentRequests}
            columns={columns}
            showSearch
            loading={loading}
            expandedSection={renderExpandedSection}
          />
        );
      case 1:
        return (
          <Table
            data={paymentHistory}
            columns={columns}
            showSearch
            loading={loading}
            expandedSection={renderExpandedSection}
          />
        );
      default:
        return null;
    }
  };

  return (
    <>
      <Row mb={6}>
        <Col w={[4, 10, 10]}>
          <T.H2 color="blue">Payments</T.H2>
        </Col>
      </Row>
      <Row mb={6}>
        <Col w={[4, 12, 12]}>
          <TopStats data={totalPayments} loading={loading} />
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
      {error && (
        <Row>
          <T.PXS color="pink">{error}</T.PXS>
        </Row>
      )}
    </>
  );
};

export default AdminPayments;
