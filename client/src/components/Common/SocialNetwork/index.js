import React from 'react';
import { Link } from 'react-router-dom';
import Icon from '../Icon';
import { H4C, H5C, PXS } from '../Typography';
import { SOCIAL } from '../../../constants/externalLinks';

import { Wrapper, InnerWrapper, SocialIcons } from './style';
import Heart from '../../../assets/heart.svg';

const SocialNetwork = ({ mobile }) => (
  <Wrapper mobile={mobile} src={Heart}>
    <InnerWrapper mobile={mobile}>
      {!mobile ? (
        <H4C>JOIN THE PRESSPAD COMMUNITY!</H4C>
      ) : (
        <H5C>JOIN THE PRESSPAD COMMUNITY!</H5C>
      )}

      <PXS mt={3}>
        We’d love for you to join the conversation on our social media:
      </PXS>
      <SocialIcons>
        {Object.entries(SOCIAL).map(link => (
          <a href={link[1]} target="_blank" rel="noopener noreferrer">
            <Icon icon={link[0]} color="lightBlue" width="40px" height="40px" />{' '}
          </a>
        ))}
      </SocialIcons>
    </InnerWrapper>
  </Wrapper>
);

export default SocialNetwork;
