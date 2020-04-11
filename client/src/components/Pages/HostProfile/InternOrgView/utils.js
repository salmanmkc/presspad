import React from 'react';
import axios from 'axios';
import { Spin, message } from 'antd';
import {
  API_VERIFY_PROFILE_URL,
  API_GET_USER_BOOKINGS_URL,
} from '../../../../constants/apiRoutes';

import { HOST_COMPLETE_PROFILE_URL } from '../../../../constants/navRoutes';

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
    return message.error(error || 'Something went wrong');
  }
};

export const getHostProfile = async (...props) => {
  const { match, role, history } = props[0];
  try {
    let hostId = match.params.id;
    if (!hostId && match.path === '/my-profile') {
      hostId = props.id;
    }

    const { data } = await axios.get(`/api/host/${hostId}`);
    return { profileData: data };
  } catch (err) {
    let error = err.response && err.response.data && err.response.data.error;
    if (
      error === 'User has no profile' &&
      ['host', 'superhost'].includes(role)
    ) {
      message
        .info(
          <p>
            You don&apos;t have a profile
            <br /> You will be redirected to complete your profile
          </p>,
          1,
        )
        .then(() => history.push(HOST_COMPLETE_PROFILE_URL));
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
