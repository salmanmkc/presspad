import React, { useState } from 'react';
import { Table } from 'antd';

import { columns, createDataSource } from './config.PaymentsTable';

const PaymentsTable = ({ data, highlightVal, handleConfirm, loading }) => {
  const dataSource = loading ? [] : createDataSource(data);
  const [bankDetails, setBankDetails] = useState({
    bankName: '',
    bankSortCode: '',
  });

  const onInputChange = e => {
    const { name, value } = e.target;
    setBankDetails({ ...bankDetails, [name]: value });
  };

  console.log('bankDe', bankDetails);

  return (
    <Table
      dataSource={dataSource}
      columns={columns(highlightVal, handleConfirm, onInputChange)}
      loading={loading}
    />
  );
};

export default PaymentsTable;
