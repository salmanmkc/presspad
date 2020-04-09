import React from 'react';

import {
  CalendarDiv,
  CalendarCard,
  AvailableHosting,
  MobileCalendarCard,
} from '../Profile.style';

import * as T from '../../../Common/Typography';

import Icon from '../../../Common/Icon';
import Button from '../../../Common/Button';

import Calendar from '../Calendar';

export default ({
  type,
  calendarData: {
    calendarBookingDetails: {
      currentUserId,
      hostId,
      role,
      listingId,
      availableDates,
      internBookings,
      price,
    },
    calendarFunctions: { getHostProfile, toggleDateSection },
    stateProps: { expandDateSection },
  },
}) =>
  type === 'desktop' ? (
    <CalendarCard>
      <CalendarDiv userRole={role}>
        {role === 'host' && <T.H3>Availability & Price</T.H3>}
        {role !== 'host' && (
          <>
            <T.H3>Availability & Price</T.H3>
          </>
        )}
        <Calendar
          currentUserId={currentUserId}
          hostId={hostId}
          role={role}
          listingId={listingId}
          availableDates={availableDates}
          internBookings={internBookings}
          price={price}
          adminView={role === 'admin'}
          getHostProfile={getHostProfile}
        />
      </CalendarDiv>
    </CalendarCard>
  ) : (
    <AvailableHosting expanded={expandDateSection}>
      {expandDateSection ? (
        <MobileCalendarCard open>
          <Icon
            type="close"
            style={{
              fontSize: '32px',
              color: 'primary',
              cursor: 'pointer',
              position: 'absolute',
              top: '1rem',
              right: '1rem',
            }}
            onClick={toggleDateSection}
          />
          <CalendarDiv userRole={role}>
            {role === 'host' && <T.H3>Availability & Price</T.H3>}
            {role !== 'host' && (
              <>
                <T.H3>Availability & Price</T.H3>
              </>
            )}
            <Calendar
              currentUserId={currentUserId}
              hostId={hostId}
              role={role}
              listingId={listingId}
              availableDates={availableDates}
              internBookings={internBookings}
              price={price}
              adminView={role === 'admin'}
              getHostProfile={getHostProfile}
            />
          </CalendarDiv>
        </MobileCalendarCard>
      ) : (
        <MobileCalendarCard>
          <T.H3>Availability & Price</T.H3>
          <Button
            type="secondary"
            label="View dates"
            width="180px"
            onClick={toggleDateSection}
          />
        </MobileCalendarCard>
      )}
    </AvailableHosting>
  );
