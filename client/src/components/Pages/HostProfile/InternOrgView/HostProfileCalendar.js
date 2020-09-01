import React from 'react';

import {
  CalendarDiv,
  CalendarCard,
  AvailableHosting,
  MobileCalendarCard,
  MobileCalendarHeadline,
} from '../Profile.style';

import * as T from '../../../Common/Typography';

import Icon from '../../../Common/Icon';
import Button from '../../../Common/ButtonNew';

import Calendar from '../Calendar';

export default ({
  isMobile,
  type,
  bursaryData,
  calendarData: {
    calendarBookingDetails: {
      currentUserId,
      hostId,
      role,
      listingId,
      availableDates,
      internBookings,
      price,
      bookingSearchDates,
      listingActiveBookings,
    },
    respondedRequests,
    respondingTime,
    calendarFunctions: { getHostProfile, setProfileData, toggleDateSection },
    stateProps: { expandDateSection },
  },
}) => {
  const renderCalendar = () => (
    <Calendar
      bursaryData={bursaryData}
      currentUserId={currentUserId}
      hostId={hostId}
      role={role}
      listingId={listingId}
      availableDates={availableDates}
      internBookings={internBookings}
      price={price}
      adminView={role === 'admin' || role === 'host' || role === 'organisation'}
      getHostProfile={getHostProfile}
      setProfileData={setProfileData}
      isMobile={isMobile}
      bookingSearchDates={bookingSearchDates}
      respondedRequests={respondedRequests}
      respondingTime={respondingTime}
      listingActiveBookings={listingActiveBookings}
    />
  );

  return type === 'desktop' ? (
    <CalendarCard>
      <CalendarDiv userRole={role}>
        {role === 'host' && <T.H3>Availability & Price</T.H3>}
        {role !== 'host' && (
          <>
            <T.H3>Availability & Price</T.H3>
          </>
        )}
        {renderCalendar()}
      </CalendarDiv>
    </CalendarCard>
  ) : (
    // MOBILE VIEW
    <AvailableHosting expanded={expandDateSection}>
      {expandDateSection ? (
        <MobileCalendarCard open>
          <Icon
            icon="close"
            height="40px"
            width="40px"
            style={{
              color: 'primary',
              cursor: 'pointer',
              position: 'absolute',
              top: '1rem',
              right: '1rem',
            }}
            onClick={toggleDateSection}
          />

          {expandDateSection && (
            <MobileCalendarHeadline>
              <T.H6C>AVAILABLE HOSTING</T.H6C>
              <T.PXS>
                Choose a slot to view price and request a stay with this host
              </T.PXS>
            </MobileCalendarHeadline>
          )}

          <CalendarDiv userRole={role}>{renderCalendar()}</CalendarDiv>
        </MobileCalendarCard>
      ) : (
        <MobileCalendarCard>
          <T.PSBold>View dates & price to stay</T.PSBold>
          <Button
            type="tertiary"
            outline
            small
            style={{ padding: '0.5rem' }}
            label="VIEW AVAILABILITY"
            onClick={toggleDateSection}
          />
        </MobileCalendarCard>
      )}
    </AvailableHosting>
  );
};
