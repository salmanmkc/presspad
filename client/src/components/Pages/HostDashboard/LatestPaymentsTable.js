import React from 'react';
import moment from 'moment';
import { Table } from 'antd';
import { formatPrice } from '../../../helpers';
import * as T from '../../Common/Typography';
import { TableWrapper } from './HostDashboard.style';

const LastPaymentsTable = ({ payments }) => {
  const columns = [
    {
      title: () => <T.H7C color="blue">Date</T.H7C>,
      key: 'transactionDate',
      render: (text, record) => (
        <T.H6C color="darkerGray">
          {moment(
            record.transactionDates[record.transactionDates.length - 1],
          ).format('DD MMM')}
        </T.H6C>
      ),
    },
    {
      title: () => <T.H7C color="blue">intern</T.H7C>,
      dataIndex: 'intern',
      key: 'intern',
      render: text => <T.PS>{text}</T.PS>,
    },
    {
      title: () => <T.H7C color="blue">earnings</T.H7C>,
      render: (text, record) => {
        const {
          hostInstallmentsRatioAmount,
          hostcouponTransactionsRatioAmount,
        } = record;
        return (
          <T.PS>
            £
            {formatPrice(
              hostcouponTransactionsRatioAmount + hostInstallmentsRatioAmount,
              2,
            )}
          </T.PS>
        );
      },
    },
  ];

  return (
    <TableWrapper>
      <Table
        dataSource={payments}
        columns={columns}
        loading={false}
        pagination={false}
      />
    </TableWrapper>
  );
};

export default LastPaymentsTable;
