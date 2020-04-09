import React from 'react';
import { H6C, H7C } from '../../Common/Typography';

import {
  HostCardWrapper,
  CardImage,
  CardDetailsWrapper,
  CardDetails,
  CardCity,
} from './style';

const HostCard = ({ city, postcode, img, long, startDate, endDate }) => (
  <HostCardWrapper>
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

export default HostCard;
