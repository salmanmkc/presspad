import React from 'react';

import SideMenuLayout from '../components/Layouts/SideMenuLayout';

export default {
  title: 'Layouts - SideMenuLayout',
};

const dummyLogOutFunction = () => {};
const navbarProps = { userType: 'intern', resetState: dummyLogOutFunction() };

export const LoggedIn = () => (
  <SideMenuLayout isLoggedIn navbarProps={navbarProps}>
    <div style={{ height: '2000px', background: '#a6c8ea87' }}>
      Content goes here and will take full width
    </div>
  </SideMenuLayout>
);

export const LoggedInWithBack = () => (
  <SideMenuLayout isLoggedIn goBack navbarProps={navbarProps}>
    <div style={{ height: '2000px', background: '#a6c8ea87' }}>
      Content goes here and will take full width
      <br />
      with go back props
    </div>
  </SideMenuLayout>
);

export const LoggedOut = () => (
  <SideMenuLayout navbarProps={navbarProps}>
    <div style={{ height: '2000px', background: '#a6c8ea87' }}>
      Content goes here and will take full width
    </div>
  </SideMenuLayout>
);

export const LoggedOutWithBack = () => (
  <SideMenuLayout goBack navbarProps={navbarProps}>
    <div style={{ height: '2000px', background: '#a6c8ea87' }}>
      Content goes here and will take full width
      <br />
      with go back props
    </div>
  </SideMenuLayout>
);
