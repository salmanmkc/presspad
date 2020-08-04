import React, { Component } from 'react';
import axios from 'axios';

import BookingSection from './BookingSection';
import BookingsTableSection from './BookingsTableSection';
import PaymentsSection from './PaymentsSection';
import { PageWrapper } from '../../Common/general';
import Updates from '../../Common/Section/Updates';

import { API_INTERN_DASHBOARD_URL } from '../../../constants/apiRoutes';

export default class InternDashboard extends Component {
  state = {
    bookings: [],
    installments: [],
    notifications: [],
    name: '',
    profileImage: '',
  };

  async componentDidMount() {
    const {
      data: {
        data: {
          bookings,
          installments,
          notifications,
          name,
          profile,
          nextBookingWithDetails,
        },
      },
    } = await axios.get(API_INTERN_DASHBOARD_URL);

    this.setState(() => ({
      bookings,
      installments,
      notifications,
      name,
      profileImage: profile && profile.profileImage,
      nextBookingWithDetails,
    }));
  }

  render() {
    const {
      notifications,
      name,
      profileImage,
      bookings,
      installments,
      nextBookingWithDetails,
    } = this.state;
    const { windowWidth, role } = this.props;

    return (
      <PageWrapper>
        <BookingSection
          data={{ name, profileImage, nextBookingWithDetails }}
          role={role}
        />
        <Updates updates={notifications} userRole="intern" />
        <BookingsTableSection data={bookings} windowWidth={windowWidth} />
        <PaymentsSection data={installments} />
      </PageWrapper>
    );
  }
}
