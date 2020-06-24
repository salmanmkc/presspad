import React from 'react';
import { Badge } from 'antd';
import moment from 'moment';

import { BlueLink } from './InternDashboard.style';
import { bookingStatus } from '../../../theme';
import { formatPrice } from '../../../helpers';
import tidyStatusText from '../../../helpers/tidyStatusText';

export const paymentsColumns = [
  {
    title: 'Due date',
    dataIndex: 'dueDate',
    render: (text, record) => (
      <span>{moment(record.dueDate).format('DD MMM YYYY')}</span>
    ),
  },
  {
    title: 'Amount due',
    dataIndex: 'amount',
    render: (text, record) => <span>£{formatPrice(record.amount)}</span>,
  },
  {
    title: 'Status',
    dataIndex: 'status',
    render: (text, record) => {
      if (record.transaction) {
        return <span>Paid</span>;
      }
      return <span>Not Paid</span>;
    },
  },
];

export const bookingsColumns = windowWidth => {
  const columns = [
    {
      title: 'Host',
      dataIndex: '',
      render: (text, record) => (
        <BlueLink
          style={{ textTransform: 'capitalize' }}
          onClick={e => e.stopPropagation()}
          to={`/hosts/${record.host._id}`}
        >
          {record.host.name}
        </BlueLink>
      ),
    },
    {
      title: 'Start Date',
      dataIndex: 'startDate',
      render: (text, record) => (
        <span>{moment(record.startDate).format('DD MMM YYYY')}</span>
      ),
    },
  ];

  if (windowWidth > 500) {
    columns.push({
      title: 'End Date',
      dataIndex: 'endDate',
      render: endDate => <span>{moment(endDate).format('DD MMM YYYY')}</span>,
    });
  }

  if (windowWidth > 650) {
    columns.push({
      title: 'Total Price',
      dataIndex: 'price',
      render: price => <span>£{formatPrice(price)}</span>,
    });
  }
  if (windowWidth > 1000) {
    columns.push({
      title: 'Paid so far',
      dataIndex: 'payedAmount',
      render: payedAmount => <span>£{formatPrice(payedAmount)}</span>,
    });
  }

  columns.push({
    title: 'Status',
    dataIndex: 'status',
    render: status => (
      <>
        <Badge
          color={bookingStatus[tidyStatusText(status)]}
          text={tidyStatusText(status)}
        />
      </>
    ),
  });

  if (windowWidth > 800) {
    columns.push({
      title: undefined,
      dataIndex: undefined,
      render: (status, record) => (
        <BlueLink
          style={{ textTransform: 'capitalize' }}
          to={`/booking/${record._id}`}
        >
          view booking
        </BlueLink>
      ),
    });
  }
  return columns;
};
