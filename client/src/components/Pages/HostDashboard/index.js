import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Spin } from 'antd';

import Content from './Content';
import { API_HOST_DASHBOARD_URL } from '../../../constants/apiRoutes';

const initState = {
  name: '',
  nextBooking: {},
  updates: [],
  accessibleFunds: null,
  pending: null,
  reviews: [],
  lastPayments: [],
  listingAvailableDates: [],
};

const HostProfile = props => {
  const [isLoading, setIsLoading] = useState(false);
  const [state, setState] = useState({ ...initState });
  const { windowWidth, role } = props;

  useEffect(() => {
    setIsLoading(true);

    const fetchData = async () => {
      const { data } = await axios.get(API_HOST_DASHBOARD_URL);

      const {
        userData: { name = '', acceptAutomatically = false },
        notifications = [],
        nextBooking = {},
        accessibleFunds = null,
        pending = null,
        reviews = [],
        lastPayments = [],
        listing: { availableDates = [] },
      } = data;

      setState({
        name,
        acceptAutomatically,
        updates: notifications,
        nextBooking,
        accessibleFunds,
        pending,
        reviews,
        lastPayments,
        listingAvailableDates: availableDates,
      });
    };
    fetchData();
    setIsLoading(false);
  }, []);

  const {
    name,
    updates,
    nextBooking,
    pending,
    accessibleFunds,
    reviews,
    lastPayments,
    listingAvailableDates,
    acceptAutomatically,
  } = state;

  if (isLoading) return <Spin />;

  return (
    <Content
      windowWidth={windowWidth}
      name={name}
      role={role}
      updates={updates}
      nextBooking={nextBooking}
      accessibleFunds={accessibleFunds}
      pending={pending}
      reviews={reviews}
      lastPayments={lastPayments}
      listingAvailableDates={listingAvailableDates}
      acceptAutomatically={acceptAutomatically}
    />
  );
};

export default HostProfile;
