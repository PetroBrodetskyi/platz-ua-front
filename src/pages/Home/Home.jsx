import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import ProductList from '../../components/ProductList/ProductList';
import CreateAdButton from '../../components/CreateAdButton/CreateAdButton';
import Logout from '../../components/Logout/Logout';
import Notification from '../../components/Notification/Notification';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button
} from '@mui/material';
import logo from '/logo.svg';
import scss from './Home.module.scss';

const Home = () => {
  const [notification, setNotification] = useState('');
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    const notificationMessage = localStorage.getItem('notification');
    if (notificationMessage) {
      setNotification(notificationMessage);
      localStorage.removeItem('notification');
    }

    const hasSeenPopup = sessionStorage.getItem('hasSeenPopup');
    if (!hasSeenPopup) {
      setIsPopupVisible(true);
      sessionStorage.setItem('hasSeenPopup', 'true');
    }
  }, [user]);

  const handleCloseNotification = () => {
    setNotification('');
  };

  const handleClosePopup = () => {
    setIsPopupVisible(false);
    document.body.style.overflow = 'auto';
  };

  useEffect(() => {
    if (isPopupVisible) {
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isPopupVisible]);

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

      <Dialog
        open={isPopupVisible}
        onClose={handleClosePopup}
        className={scss.popup}
      >
        <DialogContent className={scss.content}>
          <div className={scss.logoTitle}>
            <img src={logo} alt="Логотип" className={scss.logo} />
            <h4 className={scss.title}>Вітаємо на сайті PlatzUA!</h4>
          </div>
          <div>
            <b>Сайт ще перебуває у розробці, але ми активно працюємо</b>, щоб
            якнайшвидше запустити його. Наша мета — створити платформу{' '}
            <b>для українців у Німеччині</b>, яка стане корисним і надійним
            ресурсом. Вона надасть можливість зручно купувати, продавати,
            знаходити друзів, спілкуватися та отримувати підтримку.
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClosePopup} color="primary">
            Закрити
          </Button>
        </DialogActions>
      </Dialog>

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
