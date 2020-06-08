// page listenes to route /bookings/:bookingId/cancellation
// checks for cancellation type (automatedCancellation / confirmationNeeded) and redirects accordingly
// e.g. booking/123/cancellation-confirm (-> are you sure page)
// booking/123/cancellation-confirmed (-> confirm page)
// booking/123/canellation-request (request page)
// sends booking and user infos to relevant pages

import React from 'react';
import { Redirect } from 'react-router-dom';

import { Error404, Error500 } from '../../../constants/navRoutes';
import AreYouSure from './AreYouSure';

const Cancellation = ({ ...props }) => {
  const {
    cancellationType,
    location: { state },
  } = props;

  if (!state && !state.bookingDetails) return <Redirect to={Error500} />;

  switch (cancellationType) {
    case 'areYouSure':
      return <AreYouSure bookingDetails={state} {...props} />;
    // TODO add cases for other cancellationTypes cancellationConfirmed and canecllationRequest
    default:
      return <Redirect to={Error404} />;
  }
};

export default Cancellation;
