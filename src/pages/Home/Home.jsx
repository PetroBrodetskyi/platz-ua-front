import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import ProductList from '../../components/ProductList';
import CreateAdButton from '../../components/CreateAdButton';
import Following from '../../components/Following';
import VipList from '../../components/VipList';
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
      <VipList />
      <ProductList />
      <CreateAdButton />

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
          Зараз ми активно працюємо, щоб створити для вас цей сайт. Наша мета —
          розробити зручну та зрозумілу платформу для українців в Німеччині, яка
          стане корисним та надійним ресурсом. Вона надасть можливість зручно
          купувати, продавати, знаходити друзів, спілкуватися та отримувати
          підтримку
        </Alert>
      </Snackbar>
    </div>
  );
};

export default Home;
