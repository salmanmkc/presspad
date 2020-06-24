/* eslint-disable import/prefer-default-export */
import React from 'react';
import moment from 'moment';
import BookingStatus from '../../Common/BookingStatus';
import * as T from '../../Common/Typography';
import { formatPrice } from '../../../helpers';
import tidyStatusText from '../../../helpers/tidyStatusText';

export const bookingsColumns = ({ windowWidth, role }) => {
  const columns = [];

  //  desktop / tablet
  if (windowWidth > 767) {
    columns.push({
      title: 'Dates',
      dataIndex: 'startDate',
      render: (startDate, row) => (
        <T.PSBold>
          {moment(startDate).format('DD MMM')} -{' '}
          {moment(row.endDate).format('DD MMM')}
        </T.PSBold>
      ),
    });
    // HOST / INTERN
    columns.push({
      title: `${role === 'intern' ? 'Host' : 'Intern'}`,
      dataIndex: 'withUser',
      render: withUser => <T.PS>{withUser && withUser}</T.PS>,
    });

    // EARNINGS / COST
    columns.push({
      title: `${role === 'intern' ? 'Cost' : 'Earnings'}`,
      dataIndex: 'price',
      render: price => <T.PS>£{formatPrice(price)}</T.PS>,
    });
    // STATUS
    columns.push({
      title: 'Status',
      dataIndex: 'status',
      render: status => (
        <>
          <BookingStatus status={tidyStatusText(status)}>
            {tidyStatusText(status)}
          </BookingStatus>
        </>
      ),
    });
  } else {
    columns.push({
      title: 'Details',
      dataIndex: 'startDate',
      render: (startDate, row) => (
        <span>
          <T.PSBold>
            {moment(startDate).format('DD MMM')} -{' '}
            {moment(row.endDate).format('DD MMM')}
          </T.PSBold>
          <T.PS>{row.withUser && row.withUser}</T.PS>
        </span>
      ),
    });

    columns.push({
      title: 'Status',
      dataIndex: 'status',
      render: status => (
        <>
          <BookingStatus status={tidyStatusText(status)}>
            {tidyStatusText(status)}
          </BookingStatus>
        </>
      ),
    });
  }

  return columns;
};
