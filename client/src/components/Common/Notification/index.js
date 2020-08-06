import React from 'react';
import { message } from 'antd';

import './style.css';

const Notifiaction = ({ setOpen, open, content, cb }) => {
  const handleClose = () => {
    setOpen(false);
    cb();
  };
  if (open) {
    return (
      <div>
        {message.success({
          icon: ' ',
          onClose: () => handleClose(),
          content,
          className: 'custom-class',
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

export default Notifiaction;
