import axios from 'axios';
import { message } from 'antd';
import { API_GET_BOOKINGS_URL } from '../../../constants/apiRoutes';

// eslint-disable-next-line import/prefer-default-export
export const getBookings = async () => {
  const { data, error } = await axios.get(API_GET_BOOKINGS_URL);
  try {
    if (data) {
      return data;
    }
    return error;
  } catch (err) {
    return message.error(err || 'Something went wrong');
  }
};
