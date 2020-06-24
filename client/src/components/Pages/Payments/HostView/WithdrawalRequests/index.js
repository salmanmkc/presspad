import React from 'react';
import { Table } from 'antd';
import moment from 'moment';

import * as S from './style';
import * as T from '../../../../Common/Typography';

const labels = {
  transfered: { component: S.CompletedLabel, text: 'completed' },
  pending: { component: S.PendingLabel, text: 'processing' },
  cancelled: { component: S.CancelledLabel, text: 'denied ' },
};

const WithdrawHistoryTable = ({ withdrawalRequests }) => {
  const columns = [
    {
      title: () => <T.H7C color="gray">Dates</T.H7C>,
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: a => (
        <T.PSBold color="darkerGray">{moment(a).format('DD MMM')}</T.PSBold>
      ),
    },
    {
      title: () => <T.H7C color="gray">AMOUNT</T.H7C>,
      dataIndex: 'amount',
      key: 'amount',
      render: a => <T.PS color="black">£{a}</T.PS>,
    },
    {
      title: () => <T.H7C color="gray">Payment status</T.H7C>,
      dataIndex: 'status',
      key: 'status',
      render: a => {
        const Label = labels[a].component;
        return (
          <Label>
            <T.H7C color="white">{labels[a].text}</T.H7C>
          </Label>
        );
      },
    },
  ];
  return <Table dataSource={withdrawalRequests} columns={columns} />;
};

export default WithdrawHistoryTable;
