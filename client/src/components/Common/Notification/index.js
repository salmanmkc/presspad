import { notification } from 'antd';

const Notifiaction = ({ message, duration, open = false, setOpen }) => {
  const handleClose = () => {
    setOpen(false);
  };
  console.log(open);
  return open
    ? notification.open({
        message: 'Notification Title',
        onClose: handleClose,
        duration: 500,
        bottom: 0,
        description:
          'This is the content of the notification. This is the content of the notification. This is the content of the notification.',
        className: 'custom-class',
        style: {
          width: '100vh',
        },
      }) || null
    : notification.close(open) || null;
};

export default Notifiaction;
