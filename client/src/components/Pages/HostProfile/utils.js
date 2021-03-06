import axios from 'axios';
import { message } from 'antd';
import {
  API_VERIFY_PROFILE_URL,
  API_GET_USER_BOOKINGS_URL,
  API_HOST_PROFILE_URL,
  API_HOST_PROFILE_SOFT_URL,
  API_GET_INTERN_BURSARY_APPLICATION,
} from '../../../constants/apiRoutes';

import { HOST_COMPLETE_PROFILE_URL } from '../../../constants/navRoutes';

// eslint-disable-next-line import/prefer-default-export
export const getUserBookings = async (role, id) => {
  try {
    if (role !== 'admin') {
      const { data } = await axios.get(
        API_GET_USER_BOOKINGS_URL.replace(':id', id),
      );

      return { internBookings: data, error: null };
    }
  } catch (error) {
    message.error(error || 'Something went wrong');
    return { error };
  }
};

export const getHostProfile = async (...props) => {
  const { match, role, history } = props.length && props[0];

  try {
    let hostId = match.params.id;
    if (!hostId && match.path === '/my-profile') {
      hostId = props.id;
    }

    const { data } = await axios.get(
      role && role.length
        ? API_HOST_PROFILE_URL.replace(':id', hostId)
        : API_HOST_PROFILE_SOFT_URL.replace(':id', hostId),
    );

    return { profileData: data };
  } catch (err) {
    let error = err.response && err.response.data && err.response.data.error;
    if (error && ['host', 'superhost'].includes(role)) {
      message.info(error).then(() => history.push(HOST_COMPLETE_PROFILE_URL));
      return { error: 'Need to complete profile' };
    }
    error = error || 'Something went wrong';
    message.error(error);
    return { error };
  }
};

export const verifyProfile = async (profileId, bool) => {
  try {
    const { data } = await axios.post(API_VERIFY_PROFILE_URL, {
      profileId,
      verify: bool,
    });

    return { verifiedProfile: data };
  } catch (error) {
    message.error(error || 'Something went wrong');
    return { error };
  }
};

export const getInternApprovedBursaryApplication = async () => {
  try {
    const { data: bursary } = await axios.get(
      API_GET_INTERN_BURSARY_APPLICATION,
    );

    return { bursary };
  } catch (error) {
    message.error(error || 'Something went wrong');
    return { error };
  }
};
