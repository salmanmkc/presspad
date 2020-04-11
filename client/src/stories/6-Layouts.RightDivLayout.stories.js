import React from 'react';

import RightDivLayout from '../components/Layouts/RightDivLayout';

export default {
  title: 'Layouts - RightDivLayout',
};

const dummyLogOutFunction = () => {};
const navbarProps = { userType: 'intern', resetState: dummyLogOutFunction() };

const mainContent = <div>Main content goes here</div>;

const sideContent = (
  <div>
    {' '}
    Side Content goes here. Mobile layout might well change once we design hi
    res for the sign up pages that will use this layout more. Currently we don't
    have a mobile version of this layout
  </div>
);

export const Main = () => (
  <RightDivLayout
    isLoggedIn
    navbarProps={navbarProps}
    mainContent={mainContent}
    sideContent={sideContent}
  />
);
