import React from 'react';
import { action } from '@storybook/addon-actions';
import { MemoryRouter } from 'react-router-dom';
import BookingFlowLayout from '../components/Layouts/BookingFLow';

export default {
  title: 'Layouts - BookingFlow',
  component: BookingFlowLayout,
};

export const LoggedIn = () => (
  <MemoryRouter>
    <BookingFlowLayout onClick={action('clicked')} isLoggedIn>
      <div style={{ width: '100%', height: '2000px', background: '#a6c8ea87' }}>
        Content goes here and will take full width
      </div>
    </BookingFlowLayout>
  </MemoryRouter>
);

export const Loggedout = () => (
  <MemoryRouter>
    <BookingFlowLayout onClick={action('clicked')}>
      <div style={{ width: '100%', height: '2000px', background: '#a6c8ea87' }}>
        Content goes here and will take full width
      </div>
    </BookingFlowLayout>
  </MemoryRouter>
);

// export const Emoji = () => (
//   <BookingFlowLayout onClick={action('clicked')}>
//     <span role="img" aria-label="so cool">
//       😀 😎 👍 💯
//     </span>
//   </BookingFlowLayout>
// );
