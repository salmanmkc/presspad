import React from 'react';

import Table from './index';

export default {
  title: 'Tables',
};

export const BasicTable = () => {
  const columns = [
    { title: 'Name', dataIndex: 'name', key: 'name' },
    { title: 'Hometown', dataIndex: 'hometown', key: 'hometown' },
  ];

  const data = [{ name: 'Test Name', hometown: 'Test Hometown' }];

  return (
    <div style={{ padding: '20px' }}>
      <Table columns={columns} data={data} />
    </div>
  );
};
