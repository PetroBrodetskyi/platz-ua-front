import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Collapse } from '@mui/material';
import { TransitionGroup } from 'react-transition-group';
import { fetchUserProducts } from '../../../redux/features/productsSlice';
import SidebarMyAdItem from '../SidebarMyAdItem/SidebarMyAdItem';
import scss from './SidebarMyAds.module.scss';
import Notification from '../../Notification/Notification';
import { Confirmation } from '../../Confirmation/Confirmation';
import axios from 'axios';

const SidebarMyAds = () => {
  const dispatch = useDispatch();
  const userProducts = useSelector((state) => state.products.userProducts);
  const [notification, setNotification] = useState('');
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [productIdToDelete, setProductIdToDelete] = useState(null);

  useEffect(() => {
    dispatch(fetchUserProducts());
  }, [dispatch]);

  const handleRemoveFromMyAds = (productId) => {
    setProductIdToDelete(productId);
    setShowConfirmation(true);
  };

  const confirmDelete = async () => {
    setShowConfirmation(false);
    if (!productIdToDelete) return;

    try {
      await axios.delete(
        `https://platz-ua-back.vercel.app/api/products/${productIdToDelete}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );

      // Оновлення локального стану для видалення продукту
      const updatedProducts = userProducts.filter((prod) => prod._id !== productIdToDelete);
      dispatch(fetchUserProducts(updatedProducts));

      setNotification('Ваше оголошення успішно видалено!');
    } catch (error) {
      console.error('Error deleting product:', error.response ? error.response.data : error.message);
      setNotification('Виникла помилка при видаленні продукту. Спробуйте ще раз.');
    }
  };

  const cancelDelete = () => {
    setProductIdToDelete(null);
    setShowConfirmation(false);
  };

  return (
    <div className={scss.sidebarMyAds}>
      {userProducts.length === 0 ? (
        <p>У вас немає власних оголошень</p>
      ) : (
        <ul className={scss.myAdsList}>
          <TransitionGroup className={scss.list}>
            {userProducts.map((product) => (
              <Collapse key={product._id} timeout={500}>
                <SidebarMyAdItem
                  product={product}
                  onRemove={handleRemoveFromMyAds}
                />
              </Collapse>
            ))}
          </TransitionGroup>
        </ul>
      )}
      {notification && (
        <Notification
          message={notification}
          onClose={() => setNotification('')}
        />
      )}
      {showConfirmation && (
        <Confirmation
          message="Ви впевнені, що хочете видалити це оголошення?"
          onConfirm={confirmDelete}
          onCancel={cancelDelete}
        />
      )}
    </div>
  );
};

export default SidebarMyAds;