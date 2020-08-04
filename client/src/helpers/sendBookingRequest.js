import axios from 'axios';
import { API_BOOKING_REQUEST_URL } from '../constants/apiRoutes';
import Modal from '../components/Common/Modal';

const postBooking = async data => {
  try {
    await axios.post(API_BOOKING_REQUEST_URL, data);
    Modal.success({
      title: 'Booking Request Sent!',
      content:
        'Your booking request has been submitted. Make sure to check your dashboard for a response shortly.',
    });
    return { error: null };
  } catch (error) {
    const serverError = error.response && error.response.data.error;

    let errorMsg;

    if (serverError === 'user has already a booking request for those dates') {
      errorMsg =
        'It seems like you have already requested a booking during those dates. You can only make one request at a time.';
    } else if (serverError === 'listing is not available during those dates') {
      errorMsg =
        'Unfortunately this listing is not fully available during your requested booking dates.';
    } else {
      errorMsg = serverError;
    }

    return { error: errorMsg };
  }
};

export default postBooking;
