import React from 'react';
import { withRouter } from 'react-router-dom';
import axios from 'axios';

import { message } from 'antd';
import * as S from './Menu.style';
import * as N from '../../../constants/navRoutes';
import { API_SIGNOUT_URL } from '../../../constants/apiRoutes';

const menuLinks = {
  host: [
    { title: 'Dashboard', route: N.DASHBOARD_URL },
    { title: 'Bookings', route: N.BOOKINGS_URL },
    { title: 'Payments', route: N.PAYMENTS_URL },
    { title: 'Profile', route: N.MYPROFILE_URL },
    { title: 'Refer Others', route: N.REFERRAL_URL },
    { title: 'Settings', route: N.SETTINGS_URL },
  ],
  intern: [
    { title: 'Dashboard', route: N.DASHBOARD_URL },
    { title: 'Bookings', route: N.BOOKINGS_URL },
    { title: 'Payments', route: N.PAYMENTS_URL },
    { title: 'Profile', route: N.MYPROFILE_URL },
    { title: 'Bursary', route: N.BURSARY },
    { title: 'Settings', route: N.SETTINGS_URL },
  ],
  organisation: [
    { title: 'Dashboard', route: N.DASHBOARD_URL },
    { title: 'Invoices', route: N.INVOICES },
    { title: 'Profile', route: N.MYPROFILE_URL },
    { title: 'Settings', route: N.SETTINGS_URL },
  ],
  admin: [
    { title: 'Dashboard', route: N.ADMIN_DASHBOARD_URL },
    { title: 'Clients', route: N.ADMIN_ORGS_URL },
    { title: 'Interns', route: N.ADMIN_INTERNS_URL },
    { title: 'Hosts', route: N.ADMIN_HOSTS_URL },
    { title: 'Payments', route: N.ADMIN_PAYMENTS_URL },
    { title: 'Bookings', route: N.ADMIN_BOOKINGS_URL },
    { title: 'Bursary', route: N.ADMIN_BURSARY },
  ],

  loggedOut: [
    { title: 'Find a Pad', route: N.HOSTS_URL },
    { title: 'Create an account', route: N.SIGNUP_HOST },
    { title: 'Log In', route: N.SIGNIN_URL },
  ],
};

const horizontalMenuLinks = {
  host: [{ title: 'My Account', route: N.DASHBOARD_URL }],
  intern: [
    { title: 'Find a Pad', route: N.HOSTS_URL },
    { title: 'My Account', route: N.DASHBOARD_URL },
  ],
  organisation: [{ title: 'My Account', route: N.DASHBOARD_URL }],
  admin: [
    { title: 'Find a Pad', route: N.HOSTS_URL },
    { title: 'My Account', route: N.ADMIN_DASHBOARD_URL },
  ],
  loggedOut: [
    { title: 'Find a Pad', route: N.HOSTS_URL },
    { title: 'Create an account', route: N.SIGNUP_HOST },
    { title: 'Log In', route: N.SIGNIN_URL },
  ],
};

const Menu = ({
  role,
  isLoggedIn,
  horizontal,
  isMobile,
  history,
  resetState,
  resetMenu,
}) => {
  const logOut = () => {
    axios
      .get(API_SIGNOUT_URL)
      .then(() => {
        resetState();
        history.push(N.HOME_URL);
      })
      .catch(err => message.error(err));
  };
  const isLogInActive = history.location.pathname === '/sign-in';
  return (
    <>
      {/* HORIZONTAL VIEW */}
      {horizontal &&
        isLoggedIn &&
        horizontalMenuLinks[role].map(menuLink => (
          <S.Link
            key={menuLink.route}
            to={menuLink.route}
            horizontal={horizontal}
          >
            <S.Header horizontal={horizontal}>{menuLink.title}</S.Header>
          </S.Link>
        ))}

      {/* VERTICAL VIEW */}
      {!horizontal &&
        isLoggedIn &&
        menuLinks[role].map(menuLink => (
          <S.Link
            key={menuLink.route}
            to={menuLink.route}
            isMobile={isMobile}
            onClick={resetMenu}
          >
            <S.Header>{menuLink.title}</S.Header>
          </S.Link>
        ))}

      {isLoggedIn && (
        <S.MenuButton
          onClick={() => logOut()}
          horizontal={horizontal}
          isMobile={isMobile}
        >
          <S.ButtonHeader isMobile={isMobile} horizontal={horizontal}>
            Log out
          </S.ButtonHeader>
        </S.MenuButton>
      )}

      {/* LOGGED OUT VIEW */}
      {!isLoggedIn &&
        menuLinks['loggedOut'].map(menuLink => (
          <S.Link
            key={menuLink.route}
            to={menuLink.route}
            horizontal={horizontal}
            isMobile={isMobile}
            onClick={resetMenu}
          >
            <S.Header
              isMobile={isMobile}
              horizontal={horizontal}
              isLogIn={menuLink.title === 'Log In' && !isMobile}
              isLogInActive={isLogInActive}
            >
              {menuLink.title}
            </S.Header>
          </S.Link>
        ))}
    </>
  );
};

export default withRouter(Menu);
