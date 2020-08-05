import React from 'react';

import Table from './index';
import renderLinkCol from './Common/LinkCol';

import { ADMIN_USER_DETAILS } from '../../../constants/navRoutes';

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
      <Table
        columns={columns}
        data={data}
        showSearch
        tableHeader="table header"
      />
    </div>
  );
};

export const SearchingTable = () => {
  const columns = [
    renderLinkCol('name', ADMIN_USER_DETAILS, 'id'),
    { title: 'Hometown', dataIndex: 'hometown', key: 'hometown' },
  ];

  const data = [{ name: 'Test Name', hometown: 'Test Hometown', id: 1 }];

  return (
    <div style={{ padding: '20px' }}>
      <Table
        columns={columns}
        data={data}
        showSearch
        tableHeader="table header"
      />
    </div>
  );
};
