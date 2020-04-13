import React from 'react';
import { Table, Select } from 'antd';
import moment from 'moment';
import { H7C } from '../../../Common/Typography';
import columns from './columns';
import ExpandedDetails from './ExpandedDetails';

const { Option } = Select;

export default function BookingsTable({
  getColumnSearchProps,
  data,
  loading,
  highlightVal,
  triggerHostView,
  triggerInternView,
  handleAction,
  adminAction,
}) {
  const lengthOfStay = (startDate, endDate) =>
    moment(endDate).diff(moment(startDate), 'days');

  const renderActions = (status, booking) => {
    switch (status) {
      case 'awaiting admin':
        return (
          <Select
            style={{ width: '100px' }}
            placeholder="Select"
            defaultValue={adminAction}
            onSelect={value => handleAction(value, booking)}
            autoClearSearchValue
          >
            <Option value="approveRequest">Approve</Option>
            <Option value="rejectRequest">Reject</Option>
          </Select>
        );
      case 'accepted' || 'confirmed':
        return (
          <Select
            onChange={handleAction}
            style={{ width: '100px' }}
            placeholder="Select"
          >
            <Option value="cancelBooking">Cancel</Option>
          </Select>
        );
      default:
        return <H7C color="gray">N/A</H7C>;
    }
  };

  return (
    <>
      <Table
        columns={columns(
          getColumnSearchProps,
          highlightVal,
          triggerHostView,
          triggerInternView,
          renderActions,
          lengthOfStay,
        )}
        dataSource={data}
        pagination={{ pageSize: 5 }}
        scroll={{ x: '100%' }}
        loading={loading}
        expandable={{
          expandedRowRender: (record, index) => (
            <ExpandedDetails record={record} />
          ),
        }}
      />
    </>
  );
}
