import React from 'react';
import moment from 'moment';

import Table from './index';
import { LinkCol, StandardCol } from './Common';

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

export const UsingColumnComponents = () => {
  const columns = [
    LinkCol('name', ADMIN_USER_DETAILS, 'id'),
    StandardCol('hometown'),
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

export const ExpandableContent = () => {
  const columns = [
    LinkCol('name', ADMIN_USER_DETAILS, 'id'),
    StandardCol('requestDate', 'date'),
    StandardCol('type'),
  ];

  const data = [
    {
      name: 'Test Name',
      requestDate: moment(),
      id: 1,
      type: 'Updated address',
    },
  ];

  const renderExpandSection = (rowData, index) => (
    <div>
      <p>
        Render all your expandable data here. Just make sure the data is in your
        data obj
      </p>
      <p>User Id: {rowData.id}</p>
    </div>
  );

  return (
    <div style={{ padding: '20px' }}>
      <Table
        columns={columns}
        data={data}
        showSearch
        tableHeader="table header"
        expandedSection={renderExpandSection}
      />
    </div>
  );
};
