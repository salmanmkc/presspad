import React from 'react';

import { H6C, H7C } from '../../Common/Typography';

import { HOST_PROFILE, HOST_PROFILE_SOFT } from '../../../constants/navRoutes';

import {
  HostCardWrapper,
  CardImage,
  CardDetailsWrapper,
  CardDetails,
  CardCity,
} from './style';

const HostCard = ({
  city,
  postcode,
  img,
  long,
  startDate,
  endDate,
  hostId,
  selectedStartDate,
  selectedEndDate,
  isLoggedIn,
}) => {
  let selectedSearchDates;

  if (
    selectedStartDate &&
    selectedStartDate._d !== null &&
    selectedEndDate &&
    selectedEndDate._d !== null
  ) {
    selectedSearchDates = [selectedStartDate._d, selectedEndDate._d];
  }

  return (
    <HostCardWrapper
      to={{
        pathname: isLoggedIn ? `/host/${hostId}` : `/host-light/${hostId}`,
        state: { selectedSearchDates },
      }}
    >
      <CardImage src={img} long={long} />
      <CardDetailsWrapper>
        <CardDetails>
          <CardCity>{city}</CardCity>
        </CardDetails>
        <CardDetails>
          <H6C color="darkerGray" mb="1">
            {startDate} - {endDate}
          </H6C>
          <H7C color="gray">{postcode}</H7C>
        </CardDetails>
      </CardDetailsWrapper>
    </HostCardWrapper>
  );
};

export default HostCard;
