import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import FilterProductList from '../../components/FilterProductList';
import CreateAdButton from '../../components/CreateAdButton';
import SidebarLeft from '../../components/SidebarLeft';
import SidebarRight from '../../components/SidebarRight';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import { useNavigate } from 'react-router-dom';
import scss from '../Home/Home.module.scss';
import { ConfirmationLogin } from '../../components/Confirmation/Confirmation';

const FilterPage = () => {
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const { user } = useSelector((state) => state.auth);
  const cartItems = useSelector((state) => state.cart.items);
  const navigate = useNavigate();

  useEffect(() => {
    const isNotificationShown = sessionStorage.getItem('notificationShown');
    if (!isNotificationShown) {
      setOpenSnackbar(true);
      sessionStorage.setItem('notificationShown', 'true');
    }
  }, []);

  const handleCloseSnackbar = (event, reason) => {
    if (reason === 'clickaway') return;
    setOpenSnackbar(false);
  };

  const handleCreateAdClick = () => {
    if (!user) {
      setShowConfirmation(true);
    } else {
      navigate('/create');
    }
  };

  const handleLoginConfirm = () => {
    navigate('/auth');
    setShowConfirmation(false);
  };

  const handleLoginCancel = () => {
    setShowConfirmation(false);
  };

  const handleRemoveFromCart = async (productId) => {
    try {
      await dispatch(removeFromCartBack(productId)).unwrap();
    } catch (error) {
      console.error('Failed to remove product from cart:', error);
    }
  };

  return (
    <div className={scss.home}>
      <div className={scss.filterVip}>
        <SidebarLeft />
        <div className={scss.lists}>
          <FilterProductList />
        </div>
        <SidebarRight
          cartItems={cartItems}
          selectedProducts={selectedProducts}
          handleRemoveFromCart={handleRemoveFromCart}
        />
      </div>

      <CreateAdButton onClick={handleCreateAdClick} />
      {showConfirmation && (
        <ConfirmationLogin
          message="Для створення оголошення, будь ласка, увійдіть у свій акаунт"
          onConfirm={handleLoginConfirm}
          onCancel={handleLoginCancel}
        />
      )}
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

export default FilterPage;
