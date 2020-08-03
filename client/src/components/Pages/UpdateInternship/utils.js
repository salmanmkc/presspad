import React from 'react';
import axios from 'axios';

import { API_INTERNSHIP_URL } from '../../../constants/apiRoutes';
import sendBookingRequest from '../../../helpers/sendBookingRequest';

import Modal from '../../Common/Modal';
import * as T from '../../Common/Typography';

export const updateInternship = async internshipData => {
  try {
    await axios.put(API_INTERNSHIP_URL, internshipData);

    return { error: null };
  } catch (error) {
    const status = (error.response && error.response.status) || 500;

    const errorMessage =
      (error.response && error.response.data && error.response.data.error) ||
      'Something went wrong';

    const title =
      status === 422
        ? 'Sorry! your data is invalid.'
        : 'Error updating your details!';

    Modal.error({
      title: <h2 style={{ fontWeight: 'bold' }}>{title}</h2>,
      // TODO: add better description
      content: <T.PS>{errorMessage}</T.PS>,
      // hideOkButton: true,
    });

    return { updateInternError: errorMessage };
  }
};

export const updateInternshipAndCreateBooking = async (
  bookingData,
  internshipData,
) => {
  const { updateInternError } = await updateInternship({
    ...internshipData,
    ...bookingData,
  });

  if (!updateInternError) {
    const { error: bookingError } = await sendBookingRequest(bookingData);

    if (bookingError) {
      Modal.error({
        title: <h2 style={{ fontWeight: 'bold' }}>'Something went wrong</h2>,
        // TODO: add better description
        content: <T.PS>{bookingError}</T.PS>,
        // hideOkButton: true,
      });
      return { error: bookingError };
    }
  }
  return { error: updateInternError };
};
