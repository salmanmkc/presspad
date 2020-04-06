import React from 'react';

import SideMenuLayout from '../components/Layouts/SideMenuLayout';

export default {
  title: 'Layouts - SideMenuLayout',
  component: SideMenuLayout,
};

export const LoggedIn = () => (
  <SideMenuLayout isLoggedIn>
    <div style={{ height: '2000px', background: '#a6c8ea87' }}>
      Content goes here and will take full width
    </div>
  </SideMenuLayout>
);

export const LoggedInWithBack = () => (
  <SideMenuLayout isLoggedIn goBack>
    <div style={{ height: '2000px', background: '#a6c8ea87' }}>
      Content goes here and will take full width
      <br />
      with go back props
    </div>
  </SideMenuLayout>
);

export const LoggedOut = () => (
  <SideMenuLayout>
    <div style={{ height: '2000px', background: '#a6c8ea87' }}>
      Content goes here and will take full width
    </div>
  </SideMenuLayout>
);

export const LoggedOutWithBack = () => (
  <SideMenuLayout goBack>
    <div style={{ height: '2000px', background: '#a6c8ea87' }}>
      Content goes here and will take full width
      <br />
      with go back props
    </div>
  </SideMenuLayout>
);
