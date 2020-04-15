import React from 'react';

import { ProfilePic, EditButton, Symbol } from '../Profile.style';
import {
  TopDiv,
  Header,
  HeaderDiv,
} from '../../../Common/Profile/Profiles.style';
import * as T from '../../../Common/Typography';

import profilePlaceholder from '../../../../assets/random-profile.jpg';
import starSign from '../../../../assets/star-sign-symbol.svg';

import { HOST_COMPLETE_PROFILE_URL } from '../../../../constants/navRoutes';

const handleImageFail = ({ target }) => {
  // eslint-disable-next-line no-param-reassign
  target.src = profilePlaceholder;
};

export default ({
  profileImage,
  userData: { role, currentUserId },
  profileData: { userId, name, jobTitle, organisation, city, postcode, badge },
  stateProps: { showFullData },
  helpers: { titleCase, truncatePostcode },
}) => (
  <Header>
    <TopDiv>
      <ProfilePic
        src={profileImage.url || profilePlaceholder}
        adminView={role === 'admin' || userId === currentUserId || !!name}
        onError={handleImageFail}
        blur={!showFullData}
      />
      {/* HEADLINE */}
      <HeaderDiv>
        {role === 'admin' ? (
          <T.H2>{name || 'Anonymous'}</T.H2>
        ) : (
          <T.H2 style={{ fontSize: '24px', lineHeight: '23px' }}>
            {jobTitle &&
              `A ${titleCase(jobTitle)} ${
                organisation ? `at ${titleCase(organisation)}` : ''
              }`}
          </T.H2>
        )}
        {/* ADDRESS */}
        <T.P>
          {city} {showFullData ? postcode : truncatePostcode(postcode)}
        </T.P>
      </HeaderDiv>
    </TopDiv>
    {/* BADGE */}
    <TopDiv>
      {badge && <Symbol src={starSign} />}
      {userId === currentUserId && (
        <EditButton to={HOST_COMPLETE_PROFILE_URL}>Edit Profile</EditButton>
      )}
    </TopDiv>
  </Header>
);
