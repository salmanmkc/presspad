import React from 'react';
import axios from 'axios';

import { API_INTERNSHIP_URL } from '../../../constants/apiRoutes';
import sendBookingRequest from '../../../helpers/sendBookingRequest';

import { Modal } from '../../Common/AntdWrappers';
import * as T from '../../Common/Typography';

export const updateInternship = async internshipData => {
  try {
    await axios.patch(API_INTERNSHIP_URL, internshipData);
  } catch (error) {
    const status = (error.response && error.response.status) || 500;

    const errorMessage =
      (error.response && error.response.data && error.response.data.error) ||
      'Something went wrong';

    const title =
      status === 422 ? 'Sorry! your data is invalid.' : errorMessage;

    Modal.error({
      title,
      // TODO: add better description
      content: <T.PS>{error}</T.PS>,
      hideOkButton: true,
    });
  }
};

export const updateInternshipAndCreateBooking = async ({
  bookingData,
  internshipData,
}) => {
  await updateInternship(internshipData);
  const { error } = await sendBookingRequest(bookingData);

  if (error) {
    Modal.error({
      title: 'Something went wrong',
      // TODO: add better description
      content: <T.PS>{error}</T.PS>,
      hideOkButton: true,
    });
  }
  return { error };
};
