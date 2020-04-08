import React from 'react';
import { MemoryRouter as Router } from 'react-router-dom';
import { action } from '@storybook/addon-actions';
import SideMenu from '../components/Common/Navigation/SideMenu';
import USER_TYPES from '../constants/userTypes';
import * as N from '../constants/navRoutes';

export default {
  title: 'Menu',
};

export const SideMenuIntern = () => (
  <Router initialEntries={[N.DASHBOARD_URL]}>
    <SideMenu
      role={USER_TYPES.intern}
      isLoggedIn
      resetState={action('signed-out')}
    />
  </Router>
);

export const SideMenuHost = () => (
  <Router initialEntries={[N.DASHBOARD_URL]}>
    <SideMenu
      role={USER_TYPES.host}
      isLoggedIn
      resetState={action('signed-out')}
    />
  </Router>
);

export const SideMenuOrg = () => (
  <Router initialEntries={[N.DASHBOARD_URL]}>
    <SideMenu
      role={USER_TYPES.organisation}
      isLoggedIn
      resetState={action('signed-out')}
    />
  </Router>
);

export const SideMenuAdmin = () => (
  <Router initialEntries={[N.ADMIN_DASHBOARD_URL]}>
    <SideMenu
      role={USER_TYPES.admin}
      isLoggedIn
      resetState={action('signed-out')}
    />
  </Router>
);
