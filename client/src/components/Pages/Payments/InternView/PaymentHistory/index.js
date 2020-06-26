import React from 'react';
import moment from 'moment';
import { Table } from 'antd';

import PaymentStatus from '../PaymentStatus';
import { formatPrice } from '../../../../../helpers';

import * as T from '../../../../Common/Typography';
import * as S from './style';

import { BOOKING_VIEW_URL } from '../../../../../constants/navRoutes';

const PaymentHistoryTable = ({ paymentHistory }) => {
  const columns = [
    {
      dataIndex: 'dueDate',
      key: 'dueDate',
      render: text => (
        <T.PSBold color="darkerGray">
          {moment(text)
            .format('DD MMM')
            .toUpperCase()}
        </T.PSBold>
      ),
    },
    {
      dataIndex: 'amount',
      key: 'amount',
      render: text => <T.PS>£{formatPrice(text, 2)}</T.PS>,
    },
    {
      render: (text, record) => <PaymentStatus dueDate={record.dueDate} />,
    },
    {
      render: (text, record) => (
        <S.Link to={BOOKING_VIEW_URL.replace(':id', record.booking)}>
          view booking
        </S.Link>
      ),
    },
  ];

  return (
    <S.TableWrapper>
      <Table dataSource={paymentHistory} columns={columns} pagination={false} />
    </S.TableWrapper>
  );
};
export default PaymentHistoryTable;
