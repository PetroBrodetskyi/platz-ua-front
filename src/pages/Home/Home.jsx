import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Categories from '../../components/Categories/Categories';
import ProductList from '../../components/ProductList/ProductList';
import CreateAdButton from '../../components/CreateAdButton/CreateAdButton';
import Logout from '../../components/Logout/Logout';
import Notification from '../../components/Notification/Notification';
import SplashScreen from '../../components/SplashScreen/SplashScreen';

const Home = () => {
  const [notification, setNotification] = useState('');
  const [showSplash, setShowSplash] = useState(false);
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    const isFirstVisit = sessionStorage.getItem('hasVisited') === null;

    if (isFirstVisit) {
      sessionStorage.setItem('hasVisited', 'true');
      setShowSplash(true);
    }
  }, []);

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

  const handleSplashFinish = () => {
    setShowSplash(false);
  };

  return (
    <div>
      {showSplash && <SplashScreen onFinish={handleSplashFinish} />}
      {!showSplash && (
        <>
          {notification && <Notification message={notification} onClose={handleCloseNotification} />}
          <Categories />
          <ProductList />
          <CreateAdButton />
          {user && <Logout onLogout={handleLogout} />}
        </>
      )}
    </div>
  );
};

export default Home;
