import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import ProductList from '../../components/ProductList/ProductList';
import CreateAdButton from '../../components/CreateAdButton/CreateAdButton';
import Logout from '../../components/Logout/Logout';
import Notification from '../../components/Notification/Notification';
import scss from './Home.module.scss';

const Home = () => {
  const [notification, setNotification] = useState('');
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    const notificationMessage = localStorage.getItem('notification');
    if (notificationMessage) {
      setNotification(notificationMessage);
      localStorage.removeItem('notification');
    }
  }, [user]);

  const handleCloseNotification = () => {
    setNotification('');
  };

  const handleLogout = () => {
    setNotification('Заходьте ще!');
  };

  return (
    <div className={scss.home}>
      {notification && (
        <Notification
          message={notification}
          onClose={handleCloseNotification}
        />
      )}

      <ProductList />
      <CreateAdButton />
      {user ? (
        user.verify ? (
          <Logout onLogout={handleLogout} />
        ) : (
          <p>
            Будь ласка, підтвердіть свою електронну пошту, щоб отримати доступ
            до всіх функцій.
          </p>
        )
      ) : null}
    </div>
  );
};

export default Home;
