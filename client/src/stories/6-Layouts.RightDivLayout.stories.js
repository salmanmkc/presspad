import React from 'react';

import RightDivLayout from '../components/Layouts/RightDivLayout';

export default {
  title: 'Layouts - RightDivLayout',
};

const dummyLogOutFunction = () => {};
const navbarProps = { userType: 'intern', resetState: dummyLogOutFunction() };

const sideContent = (
  <div>
    {' '}
    Side Content goes here. How this is done will probably change once we get to
    creating the components that need to put content in here. Mobile layout
    might well change once we design hi res for the sign up pages that will use
    this layout more. Currently we don't have a mobile version of this layout
  </div>
);

export const HideSidebarWhenMobile = () => (
  <RightDivLayout isLoggedIn navbarProps={navbarProps}>
    <div>Main content goes here</div>
  </RightDivLayout>
);

export const ShowTextButHideSidebarWhenMobile = () => (
  <RightDivLayout
    isLoggedIn
    navbarProps={navbarProps}
    sideContent={sideContent}
  >
    <div>Main content goes here</div>
  </RightDivLayout>
);

export const ShowSideBarWhenMobile = () => (
  <RightDivLayout
    isLoggedIn
    navbarProps={navbarProps}
    sideContent={sideContent}
    renderSide
  >
    <div>Main content goes here</div>
  </RightDivLayout>
);
