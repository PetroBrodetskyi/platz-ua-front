import { useEffect } from 'react';
import scss from './Notification.module.scss';

const Notification = ({ message, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(onClose, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className={scss.notification}>
      <p className={scss.message}>{message}</p>
    </div>
  );
};

export default Notification;
