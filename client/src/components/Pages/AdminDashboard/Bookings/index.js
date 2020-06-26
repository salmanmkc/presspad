import React, { useState } from 'react';
import { Table, Select } from 'antd';
import moment from 'moment';
import { H7C } from '../../../Common/Typography';
import columns from './columns';
import ExpandedDetails from './ExpandedDetails';
import Icon from '../../../Common/Icon';
import BookingView from './BookingView/BookingView';

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
  toggleSearchBar,
  toggleBookingView,
  bookingView,
}) {
  const [bookingDetails, setBookingDetails] = useState(null);
  const [reviewBooking, setReviewBooking] = useState(false);

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
      case 'awaiting cancellation':
        return (
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <button
              type="button"
              style={{
                background: 'none',
                border: 'none',
                cursor: 'pointer',
              }}
              onClick={() => {
                setBookingDetails(booking);
                // TODO ADD ACTION TO VIEW CANCELLED BOOKING Details (after cancellation) WITH setReviewBooking(false)
                setReviewBooking(true);
                toggleSearchBar();
                toggleBookingView();
              }}
            >
              <H7C style={{ textDecoration: 'underline' }} color="pink">
                Please Review
              </H7C>
            </button>
            <Icon icon="reviewExplanationMark" width="24px" />
          </div>
        );
      default:
        return <H7C color="gray">N/A</H7C>;
    }
  };

  return (
    <>
      {bookingView ? (
        <BookingView
          details={bookingDetails}
          reviewBooking={reviewBooking}
          setReviewBooking={setReviewBooking}
          toggleBookingView={toggleBookingView}
          toggleSearchBar={toggleSearchBar}
        />
      ) : (
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
      )}
    </>
  );
}
