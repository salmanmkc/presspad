import React, { useEffect, useState } from 'react';
import axios from 'axios';

import { Modal as AntModal } from 'antd';
import { Row, Col } from '../../../Common/Grid';
import Table from '../../../Common/Table';
import Modal from '../../../Common/Modal';
import { Input } from '../../../Common/Inputs';
import Notification from '../../../Common/Notification';
import ButtonNew from '../../../Common/ButtonNew';

import {
  LinkCol,
  StandardCol,
  TwoDatesCol,
  TagCol,
} from '../../../Common/Table/Common';
import * as T from '../../../Common/Typography';
import Tabs from '../../../Common/Tabs';

import {
  API_ADMIN_STATS_URL,
  API_ADMIN_REVIEWS_BOOKING,
} from '../../../../constants/apiRoutes';
import { ADMIN_USER_DETAILS } from '../../../../constants/navRoutes';

import BookingView from './BookingView/BookingView';

import renderExpandedSection from './renderExpandedSection';

const tabs = ['active', 'history'];

const AdminBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [bookingHistory, setBookingHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selected, setSelected] = useState(0);
  const [bookingView, setBookingView] = useState(false);
  const [bookingDetails, setBookingDetails] = useState(null);
  const [reviewBooking, setReviewBooking] = useState(false);
  const [rejectMessage, setRejectMessage] = useState('');
  const [newBookingStatus, setNewBookingStatus] = useState('');
  const [bookingToUpdate, setBookingToUpdate] = useState({});
  const [notificationOpen, setNotification] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  const handleTab = e => {
    setSelected(e);
  };

  const handleReject = e => setRejectMessage(e.target.value);

  const updateBookings = updatedBooking => {
    setLoading(true);

    if (updatedBooking.status === 'pending') {
      const newBookings = bookings.map(booking =>
        booking._id === updatedBooking._id ? updatedBooking : booking,
      );
      setBookings(newBookings);
    }

    if (updatedBooking.status === 'rejected by admin') {
      const newBookings = bookings.filter(
        booking => booking._id !== updatedBooking._id,
      );
      const newHistory = [updatedBooking, ...bookingHistory];
      setBookings(newBookings);
      setBookingHistory(newHistory);
    }
    setLoading(false);
  };

  const resetBooking = () => {
    setNewBookingStatus('');
    setBookingToUpdate({});
    setRejectMessage('');
  };

  const submitAdminReview = async () => {
    console.log('reached');
    setLoading(true);
    try {
      await axios.patch(API_ADMIN_REVIEWS_BOOKING, {
        status: newBookingStatus,
        message: rejectMessage,
        booking: bookingToUpdate,
      });
      const updatedBooking = { ...bookingToUpdate, status: newBookingStatus };
      updateBookings(updatedBooking);
      resetBooking();
      setLoading(false);
      setNotification(true);
    } catch (err) {
      setError(err);
      resetBooking();
      setNotification(true);
    }
  };

  const respondToBooking = (rowData, input) => {
    if (input === 'approve') {
      setNewBookingStatus('pending');
      setBookingToUpdate(rowData);
      setRejectMessage('');
      setModalOpen(true);
    } else if (input === 'reject') {
      setNewBookingStatus('rejected by admin');
      setBookingToUpdate(rowData);
      setRejectMessage('');
      setModalOpen(true);
    } else if (input === 'awaiting cancellation') {
      setBookingView(true);
      setBookingDetails(rowData);
      setReviewBooking(true);
    } else if (input === 'cancelled after payment') {
      setBookingDetails(rowData);
      setBookingView(true);
    }
  };

  const activeCols = [
    LinkCol('host', ADMIN_USER_DETAILS, 'id'),
    LinkCol('intern', ADMIN_USER_DETAILS, 'id'),
    TwoDatesCol('dates'),
    StandardCol('paidByOrganisation', 'perc', null, 'organisation'),
    StandardCol('bursaryCosts', 'price'),
    TagCol('status', 'booking', respondToBooking),
  ];

  const historyCols = [
    LinkCol('host', ADMIN_USER_DETAILS, 'id'),
    LinkCol('intern', ADMIN_USER_DETAILS, 'id'),
    TwoDatesCol('dates'),
    StandardCol('paidByOrganisation', 'perc', null, 'organisation'),
    StandardCol('bursaryCosts', 'price'),
    TagCol('status', 'booking', respondToBooking),
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await axios.post(API_ADMIN_STATS_URL, {
          userType: 'bookings',
        });
        const history = await axios.post(API_ADMIN_STATS_URL, {
          userType: 'bookingHistory',
        });
        setBookings(data.data);
        setBookingHistory(history.data);
        setLoading(false);
      } catch (err) {
        let errorMsg = 'Something went wrong';
        if (err.response && err.response.status !== 500) {
          errorMsg = err.response.data.error;
        }
        setError(errorMsg);
        setLoading(false);
      }
    };
    fetchData();
  }, [reviewBooking]);

  const renderTable = () => {
    switch (selected) {
      case 0:
        return (
          <Table
            data={bookings}
            columns={activeCols}
            showSearch
            loading={loading}
            expandedSection={renderExpandedSection}
          />
        );
      case 1:
        return (
          <Table
            data={bookingHistory}
            columns={historyCols}
            showSearch
            loading={loading}
            expandedSection={renderExpandedSection}
          />
        );
      default:
        return null;
    }
  };

  if (bookingView)
    return (
      <BookingView
        details={bookingDetails}
        reviewBooking={reviewBooking}
        setReviewBooking={setReviewBooking}
        setBookingView={setBookingView}
        setBookingDetails={setBookingDetails}
      />
    );

  return (
    <>
      <Row mb={6}>
        <Col w={[4, 10, 10]}>
          <T.H2 color="blue">Bookings</T.H2>
        </Col>
      </Row>
      <Row mb={4}>
        <Col w={[4, 12, 12]}>
          <Tabs items={tabs} caps handleClick={handleTab} selected={selected} />
        </Col>
      </Row>
      <Row mb={4}>
        <Col w={[4, 12, 12]}>{renderTable()}</Col>
      </Row>
      {error && (
        <Row>
          <T.PXS color="pink">{error}</T.PXS>
        </Row>
      )}
      <Notification
        setOpen={setNotification}
        open={notificationOpen}
        content={error || 'Changes saved'}
      />
      {newBookingStatus === 'rejected by admin' && (
        <Modal
          visible={modalOpen}
          title="Rejecting request"
          onOK={submitAdminReview}
          onCancel={() => setModalOpen(false)}
          content={
            <>
              <Row>
                <Col w={[4, 12, 12]}>
                  <T.PXS mb={2} mt={4}>
                    Are you sure you want to reject this request?
                  </T.PXS>
                  <T.PXS mb={4}>
                    Please write a message to the intern so they know why you
                    are rejecting their request
                  </T.PXS>
                </Col>
              </Row>
              <Row>
                <Col w={[4, 12, 12]}>
                  <Input
                    onChange={handleReject}
                    textArea
                    value={rejectMessage}
                  />
                </Col>
              </Row>
              <Row mb={2} mt={4}>
                <Col w={[4, 6, 6]}>
                  <ButtonNew
                    type="primary"
                    onClick={submitAdminReview}
                    loading={loading}
                  >
                    Reject booking
                  </ButtonNew>
                </Col>
              </Row>
            </>
          }
        />
      )}
      {newBookingStatus === 'pending' && (
        <Modal
          visible={modalOpen}
          onOK={submitAdminReview}
          onCancel={() => setModalOpen(false)}
          title="Approving request"
          hideOkButton
          content={
            <>
              <Row>
                <Col w={[4, 12, 12]}>
                  <T.PXS mb={2} mt={4}>
                    Are you sure you want to approve this request?
                  </T.PXS>
                </Col>
              </Row>
              <Row mb={2} mt={4}>
                <Col w={[4, 6, 6]}>
                  <ButtonNew
                    type="primary"
                    onClick={submitAdminReview}
                    loading={loading}
                  >
                    Approve booking
                  </ButtonNew>
                </Col>
              </Row>
            </>
          }
        />
      )}
    </>
  );
};

export default AdminBookings;
