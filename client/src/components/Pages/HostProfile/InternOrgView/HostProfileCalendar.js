import React from 'react';

import {
  CalendarDiv,
  CalendarCard,
  AvailableHosting,
  MobileCalendarCard,
} from '../Profile.style';

import * as T from '../../../Common/Typography';

import Icon from '../../../Common/Icon';
import Button from '../../../Common/ButtonNew';

import Calendar from '../Calendar';
import { colors } from '../../../../theme';

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
    // MOBILE VIEW
    <AvailableHosting expanded={expandDateSection}>
      {expandDateSection ? (
        <MobileCalendarCard open>
          <Icon
            icon="close"
            height="33px"
            width="33px"
            style={{
              color: 'primary',
              cursor: 'pointer',
              position: 'absolute',
              top: '1rem',
              right: '1rem',
            }}
            onClick={toggleDateSection}
          />

          <CalendarDiv userRole={role}>
            {role === 'host' && <T.H3>View dates & price to stay</T.H3>}
            {role !== 'host' && (
              <>
                <T.PSBold>View dates & price to stay</T.PSBold>
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
