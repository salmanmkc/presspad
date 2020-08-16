import React from 'react';
import Figure from '../../../Common/Figure';
import { Row } from '../../../Common/Grid';
import LoadingBallPulseSync from '../../../Common/LoadingBallPulseSync';

const DashboardTopStats = ({ data, loading }) => {
  if (loading) return <LoadingBallPulseSync />;

  const {
    interns,
    hosts,
    approvalRequests,
    liveBookings,
    bookingRequests,
  } = data;

  return (
    <Row jc="space-between" jcT="flex-start">
      <Figure
        stats={interns}
        title="interns"
        small
        popoverContent="total number of interns who have ever signed up, including those who have not completed their profile"
        maxWidth="25%"
        mr={3}
        mb={3}
      />
      <Figure
        stats={hosts}
        title="hosts"
        small
        popoverContent="total number of hosts who have ever signed up, including those who have not completed their profile"
        mr={3}
        mb={3}
        maxWidth="25%"
      />
      <Figure
        stats={approvalRequests}
        title="approval requests"
        small
        popoverContent="current number of host and intern profile requests awaiting admin approval"
        mr={3}
        mb={3}
        maxWidth="25%"
      />
      <Figure
        stats={liveBookings}
        title="live bookings"
        small
        popoverContent="current number of bookings that are either currently accepted or confirmed"
        mr={3}
        mb={3}
        maxWidth="25%"
      />
      <Figure
        stats={bookingRequests}
        title="booking requests"
        small
        popoverContent="cuurent number of booking requests awaiting admin approval"
        maxWidth="25%"
      />
    </Row>
  );
};
export default DashboardTopStats;
