import React from 'react';
import { useHistory } from 'react-router-dom';
import { message } from 'antd';

import './style.css';

const Notification = ({ setOpen, open, content, redirectUrl }) => {
  const history = useHistory();
  const handleClose = () => {
    setOpen(false);

    if (redirectUrl) {
      history.push(redirectUrl);
    }
  };
  if (open) {
    return (
      <div>
        {message.success({
          icon: ' ',
          onClose: () => handleClose(),
          content,
          className: 'custom-class',
          duration: 1,
          style: {
            width: '100%',
            position: 'fixed',
            bottom: 0,
          },
        })}
      </div>
    );
  }
  return null;
};

export default Notification;
