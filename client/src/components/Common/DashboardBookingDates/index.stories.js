import React from 'react';
import moment from 'moment';
import BookingDates from './index';

import { Row, Col } from '../Grid';

export default {
  title: 'Dashboard Booking Dates',
};

export const DashboardBookingDatesSection = () => {
  const storedDates = [
    {
      startDate: moment(),
      endDate: moment().add(3, 'days'),
    },
    {
      startDate: moment().add(15, 'days'),
      endDate: moment().add(30, 'days'),
    },
  ];

  return (
    <div style={{ padding: '20px' }}>
      <Row>
        <Col w={[4, 6, 6]}>
          <BookingDates currentDates={storedDates} autoAccept />
        </Col>
      </Row>
    </div>
  );
};
