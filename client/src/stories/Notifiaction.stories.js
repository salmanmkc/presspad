import React, { useState } from 'react';
import Notification from '../components/Common/Notification';

export default {
  title: 'Notification',
  component: Notification,
};

export const NotificationComponent = () => {
  const [open, setOpen] = useState(false);
  return (
    <div>
      <button onClick={() => setOpen(true)} type="button">
        click me !!!{' '}
      </button>
      <Notification open={open} setOpen={setOpen} duration={500} />
    </div>
  );
};
