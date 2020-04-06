import React from 'react';
import { action } from '@storybook/addon-actions';

import SideMenuLayout from '../components/Layouts/SideMenuLayout';

export default {
  title: 'Layouts - SideMenuLayout',
  component: SideMenuLayout,
};

export const LoggedIn = () => (
  <SideMenuLayout onClick={action('clicked')} isLoggedIn>
    <div style={{ height: '2000px', background: '#a6c8ea87' }}>
      Content goes here and will take full width
    </div>
  </SideMenuLayout>
);

export const LoggedInWithBack = () => (
  <SideMenuLayout onClick={action('clicked')} isLoggedIn goBack>
    <div style={{ height: '2000px', background: '#a6c8ea87' }}>
      Content goes here and will take full width
      <br />
      with go back props
    </div>
  </SideMenuLayout>
);

export const LoggedOut = () => (
  <SideMenuLayout onClick={action('clicked')}>
    <div style={{ height: '2000px', background: '#a6c8ea87' }}>
      Content goes here and will take full width
    </div>
  </SideMenuLayout>
);

export const LoggedOutWithBack = () => (
  <SideMenuLayout onClick={action('clicked')} goBack>
    <div style={{ height: '2000px', background: '#a6c8ea87' }}>
      Content goes here and will take full width
      <br />
      with go back props
    </div>
  </SideMenuLayout>
);
