import React from 'react';
import { Table } from 'antd';

const PaymentsHistoryTable = ({ data, loading }) => {
  const columns = [
    {
      title: 'dates',
      dataIndex: 'host',
      key: 'host',
      className: 'mainCol',
      render: text => <span>{text}</span>,
    },
  ];

  return <Table dataSource={data} columns={columns} loading={loading} />;
};
export default PaymentsHistoryTable;
