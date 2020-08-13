import React from 'react';
import { Link } from 'react-router-dom';

import Icon from '../Icon';
import * as T from '../Typography';

import { CompleteProfileWrapper } from './style';

const HeadlineStyles = {
  desktop: T.PLBold,
  mobile: T.PXSBold,
};

const CompleteProfilePrompt = ({ device, url }) => {
  const CompleteProfileText = HeadlineStyles[device];

  return (
    <CompleteProfileWrapper>
      <Icon icon="reviewExplanationMark" width="35px" height="35px" />
      <CompleteProfileText style={{ marginLeft: '0.8rem' }} color="darkerGray">
        Your profile is not complete. <br />
        <Link
          style={{
            textDecoration: 'underline',
            textUnderlinePosition: 'under',
          }}
          to={url}
        >
          Finish signing up here
        </Link>
        &nbsp;to start using PressPad
      </CompleteProfileText>
    </CompleteProfileWrapper>
  );
};

export default CompleteProfilePrompt;
