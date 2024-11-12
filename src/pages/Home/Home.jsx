import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import ProductList from '../../components/ProductList';
import CreateAdButton from '../../components/CreateAdButton';
import Logout from '../../components/Logout';
import Following from '../../components/Following';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import scss from './Home.module.scss';

const Home = () => {
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    const isNotificationShown = sessionStorage.getItem('notificationShown');

    if (!isNotificationShown) {
      setOpenSnackbar(true);
      sessionStorage.setItem('notificationShown', 'true');
    }
  }, []);

  const handleCloseSnackbar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenSnackbar(false);
  };

  return (
    <div className={scss.home}>
      {user && <Following />}

      <ProductList />
      <CreateAdButton />

      {user ? (
        user.verify ? (
          <Logout />
        ) : (
          <p>
            Будь ласка, підтвердіть свою електронну пошту, щоб отримати доступ
            до всіх функцій.
          </p>
        )
      ) : null}

      <Snackbar
        open={openSnackbar}
        autoHideDuration={30000}
        onClose={handleCloseSnackbar}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity="info"
          sx={{ width: '100%' }}
        >
          Сайт ще перебуває у розробці, але ми активно працюємо, щоб якнайшвидше
          запустити його. Наша мета — створити платформу для українців у
          Німеччині, яка стане корисним і надійним ресурсом. Вона надасть
          можливість зручно купувати, продавати, знаходити друзів, спілкуватися
          та отримувати підтримку
        </Alert>
      </Snackbar>
    </div>
  );
};

export default Home;
