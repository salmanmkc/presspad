import React from 'react';
import moment from 'moment';

import Table from './index';
import {
  LinkCol,
  StandardCol,
  DropdownCol,
  DBSCol,
  TagCol,
  PayButtonCol,
  InputCol,
  HouseViewingCol,
} from './Common';

import { ADMIN_USER_DETAILS } from '../../../constants/navRoutes';

export default {
  title: 'Tables',
};

export const ColumnComponents1 = () => {
  const btnOptions = [
    { label: 'cancel', color: 'pink', icon: 'crossCircle' },
    { label: 'paid', color: 'lightBlue', icon: 'circleTick' },
  ];

  const onClick = (rowData, action) =>
    console.log(
      'button function passed down bringing back the row data and action of button clicked',
      rowData,
      action,
    );

  const onInputChange = (rowData, e) => console.log('input function');

  const columns = [
    LinkCol('name', ADMIN_USER_DETAILS, 'id'),
    StandardCol('amount', 'price'),
    { title: 'Standard', dataIndex: 'standard', key: 'standard' },
    InputCol('bankName', onInputChange),
    PayButtonCol('actions', onClick),
  ];

  const data = [
    {
      name: 'Test Name',
      hometown: 'Test Hometown',
      amount: 400,
      standard: 'standard col type',
    },
    {
      name: 'Test Name',
      hometown: 'Test Hometown',
      amount: 400,
      bankName: 'Santander',
      accountNumber: '123123',
      sortCode: '20-23-23',
      standard: 'standard col type',
    },
  ];

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

export const ColumnComponents2 = () => {
  const columns = [
    LinkCol('name', ADMIN_USER_DETAILS, 'id'),
    StandardCol('hometown'),
    StandardCol('totalPayments', 'price'),
    TagCol('bookingStatus', 'booking'),
    StandardCol('nextPayment', 'price', null, 'newPaymentDate', 'date'),
  ];

  const data = [
    {
      name: 'Test Name',
      hometown: 'Test Hometown',
      id: 1,
      totalPayments: 3700,
      bookingStatus: 'pending',
      nextPayment: 300,
      nextPaymentDate: moment(),
    },
    {
      name: 'Other Name',
      hometown: 'Other Hometown',
      id: 1,
      totalPayments: 5890,
      bookingStatus: 'accepted',
      nextPayment: 300,
      nextPaymentDate: moment(),
    },
  ];

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

export const ColumnComponents3 = () => {
  const updateDBS = record => console.log('refer to dbs functions that exist');

  const onCancel = rowData =>
    console.log('cancel function for the house viewing', rowData);

  const onAdd = rowData =>
    console.log('add function to open modal to input date', rowData);

  const columns = [
    LinkCol('name', ADMIN_USER_DETAILS, 'id'),
    StandardCol('requestDate', 'date'),
    DBSCol('dbs', updateDBS),
    HouseViewingCol('houseViewing', onAdd, onCancel),
    StandardCol('status'),
  ];

  const data = [
    {
      name: 'Test Name',
      requestDate: moment(),
      dbs: null,
      houseViewing: moment(),
      status: 'Sign up',
    },
    {
      name: 'Test Name',
      requestDate: moment(),
      dbs: { refNum: 123123, url: 'file.pdf' },
      houseViewing: null,
      status: 'Sign up',
    },
  ];

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
  const selectOptions = [
    'Approve',
    'Reject',
    'Request Changes',
  ].map(option => ({ label: option, value: option }));

  const onChange = () => console.log('changeFunc to pass down');

  const updateDBS = record => console.log('refer to dbs functions that exist');

  const renderExpandSection = (rowData, index) => (
    <div>
      <p>
        Render all your expandable data here. Just make sure the data is in your
        data obj
      </p>
      <p>User Id: {rowData.id}</p>
    </div>
  );

  const columns = [
    LinkCol('name', ADMIN_USER_DETAILS, 'id'),
    StandardCol('requestDate', 'date'),
    DBSCol('dbs', updateDBS),
    StandardCol('type'),
    DropdownCol('approvalAction', null, selectOptions),
  ];

  const data = [
    {
      name: 'Test Name',
      requestDate: moment(),
      id: 1,
      type: 'Updated address',
      approvalAction: '',
      dbsCheck: { refNum: 123123, url: 'file.pdf' },
    },
    {
      name: 'Test Name',
      requestDate: moment().add(5, 'days'),
      id: 1,
      type: 'Updated address',
      approvalAction: '',
      dbsCheck: { refNum: 123123, url: 'file.pdf' },
    },
  ];

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

export const Preview = () => {
  const selectOptions = [
    'Approve',
    'Reject',
    'Request Changes',
  ].map(option => ({ label: option, value: option }));

  const onChange = () => console.log('changeFunc to pass down');

  const updateDBS = record => console.log('refer to dbs functions that exist');

  const renderExpandSection = (rowData, index) => (
    <div>
      <p>
        Render all your expandable data here. Just make sure the data is in your
        data obj
      </p>
      <p>User Id: {rowData.id}</p>
    </div>
  );

  const columns = [
    LinkCol('name', ADMIN_USER_DETAILS, 'id'),
    StandardCol('requestDate', 'date'),
    DBSCol('dbs', updateDBS),
    StandardCol('type'),
    DropdownCol('approvalAction', null, selectOptions),
  ];

  const data = [
    {
      name: 'Test Name',
      requestDate: moment(),
      id: 1,
      type: 'Updated address',
      approvalAction: '',
      dbsCheck: { refNum: 123123, url: 'file.pdf' },
    },
    {
      name: 'Test Name',
      requestDate: moment().add(5, 'days'),
      id: 1,
      type: 'Updated address',
      approvalAction: '',
      dbsCheck: { refNum: 123123, url: 'file.pdf' },
    },
  ];

  return (
    <div style={{ padding: '20px' }}>
      <Table
        columns={columns}
        data={data}
        showSearch
        tableHeader="table header"
        expandedSection={renderExpandSection}
        previewLink="/previewLinkGoesHere"
        previewLinkText="View all intern approval requests"
      />
    </div>
  );
};
