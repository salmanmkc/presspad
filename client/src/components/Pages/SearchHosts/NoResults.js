import React from 'react';
import * as T from '../../Common/Typography';
import { NoResultsWrapper } from './style';

const NoResults = () => (
  <NoResultsWrapper>
    <T.H4C mt="8" mb="5">
      Sorry, it is too close to your requested date to stay
    </T.H4C>
    <T.PXL>
      If you do not have anywhere to stay for your upcoming internship and it is
      urgent, please email PressPad at{' '}
      <T.Link to="urgent@presspad.co.uk" color="lightBlue">
        urgent@presspad.co.uk
      </T.Link>
    </T.PXL>
    <T.PXL mt="7">
      One of our team will get in touch personally to see if we can help you
      find somewhere to stay.
    </T.PXL>
  </NoResultsWrapper>
);

export default NoResults;
