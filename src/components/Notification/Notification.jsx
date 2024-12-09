import { useEffect } from 'react';
import { useTheme } from '../../context/ThemeContext.jsx';
import scss from './Notification.module.scss';

const Notification = ({ message, onClose }) => {
  const { isDarkMode } = useTheme();

  useEffect(() => {
    const timer = setTimeout(onClose, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className={`${scss.notification} ${isDarkMode ? scss.darkMode : ''}`}>
      <p className={scss.message}>{message}</p>
    </div>
  );
};

export default Notification;
