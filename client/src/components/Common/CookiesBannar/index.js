import React from 'react';

import CookieConsent from 'react-cookie-consent';
import cookieStyles from './style';

import './style.css';

const CookieBanner = () => (
  <CookieConsent
    location="bottom"
    buttonText="I understand"
    cookieName="PressPad Cookie"
    style={cookieStyles.general}
    buttonStyle={cookieStyles.button}
  >
    This website uses cookies to enhance the user experience.
  </CookieConsent>
);

export default CookieBanner;
