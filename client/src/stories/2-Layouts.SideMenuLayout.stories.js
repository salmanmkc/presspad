import React from 'react';
import { action } from '@storybook/addon-actions';
import { MemoryRouter } from 'react-router-dom';
import SideMenuLayout from '../components/Layouts/SideMenuLayout';

export default {
  title: 'Layouts - SideMenuLayout',
  component: SideMenuLayout,
};

export const LoggedIn = () => (
  <MemoryRouter>
    <SideMenuLayout onClick={action('clicked')} isLoggedIn>
      <div style={{ height: '2000px', background: '#a6c8ea87' }}>
        Content goes here and will take full width
      </div>
    </SideMenuLayout>
  </MemoryRouter>
);

export const Loggedout = () => (
  <MemoryRouter>
    <SideMenuLayout onClick={action('clicked')}>
      <div style={{ height: '2000px', background: '#a6c8ea87' }}>
        Content goes here and will take full width
      </div>
    </SideMenuLayout>
  </MemoryRouter>
);
