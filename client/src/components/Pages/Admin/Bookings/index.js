import React, { useEffect, useState } from 'react';
import axios from 'axios';

import { Row, Col } from '../../../Common/Grid';
import Table from '../../../Common/Table';
import {
  LinkCol,
  StandardCol,
  TwoDatesCol,
  TagCol,
} from '../../../Common/Table/Common';
import * as T from '../../../Common/Typography';
import Tabs from '../../../Common/Tabs';

import { API_ADMIN_STATS_URL } from '../../../../constants/apiRoutes';
import { ADMIN_USER_DETAILS } from '../../../../constants/navRoutes';

import renderExpandedSection from './renderExpandedSection';

const tabs = ['active', 'history'];

const AdminBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [bookingHistory, setBookingHistory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [selected, setSelected] = useState(0);

  const handleTab = e => {
    setSelected(e);
  };

  const activeCols = [
    LinkCol('host', ADMIN_USER_DETAILS, 'id'),
    LinkCol('intern', ADMIN_USER_DETAILS, 'id'),
    TwoDatesCol('dates'),
    StandardCol('paidByOrganisation', 'perc', null, 'organisation'),
    StandardCol('bursaryCosts', 'price'),
    TagCol('status', 'booking'),
  ];

  const historyCols = [
    LinkCol('host', ADMIN_USER_DETAILS, 'id'),
    LinkCol('intern', ADMIN_USER_DETAILS, 'id'),
    TwoDatesCol('dates'),
    StandardCol('paidByOrganisation', 'perc', null, 'organisation'),
    StandardCol('bursaryCosts', 'price'),
    TagCol('status', 'booking'),
  ];

  useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
      try {
        const data = await axios.post(API_ADMIN_STATS_URL, {
          userType: 'bookings',
        });
        const history = await axios.post(API_ADMIN_STATS_URL, {
          userType: 'bookingHistory',
        });
        setBookings(data.data);
        setBookingHistory(history.data);
      } catch (err) {
        let errorMsg = 'Something went wrong';
        if (err.response && err.response.status !== 500) {
          errorMsg = err.response.data.error;
        }
        setError(errorMsg);
      }
    };
    fetchData();
    setLoading(false);
  }, []);

  const renderTable = () => {
    switch (selected) {
      case 0:
        return (
          <Table
            data={bookings}
            columns={activeCols}
            showSearch
            loading={loading}
            expandedSection={renderExpandedSection}
          />
        );
      case 1:
        return (
          <Table
            data={bookingHistory}
            columns={historyCols}
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
          <T.H2 color="blue">Bookings</T.H2>
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

export default AdminBookings;
