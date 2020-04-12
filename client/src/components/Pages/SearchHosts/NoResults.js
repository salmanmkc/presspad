import React from 'react';
import * as T from '../../Common/Typography';
import { NoResultsWrapper } from './style';

const NoResults = ({ within7Days }) => (
  <NoResultsWrapper>
    <T.H4C mt="8" mb="5">
      {within7Days
        ? 'Sorry, it is too close to your requested date to stay'
        : 'Sorry, No hosts are available'}
    </T.H4C>
    {within7Days ? (
      <T.P>
        If you do not have anywhere to stay for your upcoming internship and it
        is urgent, please email PressPad at{' '}
        <T.Link to="urgent@presspad.co.uk" color="lightBlue">
          urgent@presspad.co.uk
        </T.Link>
      </T.P>
    ) : (
      <T.P>
        We can’t find any hosts that are available for your dates. Please try
        again another time. However, if you do not have anywhere to stay for
        your upcoming internship and it is urgent, please email PressPad at{' '}
        <T.Link to="urgent@presspad.co.uk" color="lightBlue">
          urgent@presspad.co.uk
        </T.Link>{' '}
      </T.P>
    )}
    <T.P mt="7">
      One of our team will get in touch personally to see if we can help you
      find somewhere to stay.
    </T.P>
  </NoResultsWrapper>
);

export default NoResults;
