import React, { Component } from 'react';
import axios from 'axios';

import Content from './Content';
import { API_HOST_DASHBOARD_URL } from '../../../constants/apiRoutes';

class HostProfile extends Component {
  state = {
    name: '',
    nextBooking: {},
    updates: [],
    apiLoading: false,
    accessibleFunds: null,
    pending: null,
    reviews: [],
    lastPayments: [],
    listingAvailableDates: [],
  };

  async componentDidMount() {
    this.fetchData();
  }

  fetchData = async () => {
    const { data } = await axios.get(API_HOST_DASHBOARD_URL);
    console.log('DATA', data);
    const {
      userData: { name = '', acceptAutomatically },
      notifications = [],

      nextBooking = {},
      accessibleFunds,
      pending,
      reviews,
      lastPayments,
      listing: { availableDates = [] },
    } = data;

    this.setState(() => ({
      name,
      acceptAutomatically,
      updates: notifications,
      nextBooking,
      accessibleFunds,
      pending,
      reviews,
      lastPayments,
      listingAvailableDates: availableDates,
    }));
  };

  render() {
    const { windowWidth, role } = this.props;
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
    } = this.state;
    return (
      <Content
        // Props & state\
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
  }
}

export default HostProfile;
