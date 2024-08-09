import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Categories from '../../components/Categories/Categories';
import ProductList from '../../components/ProductList/ProductList';
import CreateAdButton from '../../components/CreateAdButton/CreateAdButton';
import Logout from '../../components/Logout/Logout';
import Notification from '../../components/Notification/Notification';
import Chat from '../../components/Chat/Chat';

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
    <div>
      {notification && <Notification message={notification} onClose={handleCloseNotification} />}
      <Categories />
      <ProductList />
      <Chat />
      <CreateAdButton />
      {user && <Logout onLogout={handleLogout} />}
    </div>
  );
};

export default Home;
