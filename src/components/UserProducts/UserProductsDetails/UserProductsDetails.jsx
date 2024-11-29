import { useEffect, useReducer, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { TbLocation } from 'react-icons/tb';
import Tooltip from '@mui/material/Tooltip';
import CartPrice from '../../ProductCard/CartPrice';
import Notification from '../../Notification/Notification';
import SubmitButton from '../../SubmitButton';
import { useTheme } from '../../../context/ThemeContext';
import { fetchExchangeRate } from '../../../redux/features/productsSlice';
import {
  addToCartBack,
  removeFromCartBack,
  selectCartItems
} from '../../../redux/features/cartSlice';
import { selectCurrentUser } from '../../../redux/features/authSlice';
import axiosInstance from '../../../redux/axiosConfig';
import { Confirmation } from '../../Confirmation/Confirmation';
import scss from './UserProductsDetails.module.scss';

const initialState = (product) => ({
  name: product.name,
  price: product.price,
  description: product.description,
  city: product.city,
  PLZ: product.PLZ,
  status: product.status
});

const reducer = (state, { field, value }) => ({ ...state, [field]: value });

const UserProductsDetails = ({ product }) => {
  const dispatch = useDispatch();
  const exchangeRate = useSelector((state) => state.products.exchangeRate);
  const cartItems = useSelector(selectCartItems);
  const currentUser = useSelector(selectCurrentUser);
  const [editedProduct, dispatchEdit] = useReducer(
    reducer,
    product,
    initialState
  );
  const [isInCart, setIsInCart] = useState(
    cartItems.some((item) => item._id === product._id)
  );
  const [notification, setNotification] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [isDeleteConfirmVisible, setIsDeleteConfirmVisible] = useState(false);
  const { isDarkMode } = useTheme();

  useEffect(() => {
    if (!exchangeRate) {
      dispatch(fetchExchangeRate());
    }
  }, [dispatch, exchangeRate]);

  useEffect(() => {
    setIsInCart(cartItems.some((item) => item._id === product._id));
  }, [cartItems, product._id]);

  const handleAddToCart = async () => {
    try {
      if (isInCart) {
        await dispatch(removeFromCartBack(product._id));
        setNotification(`${product.name} видалено з кошика!`);
      } else {
        await dispatch(addToCartBack(product));
        setNotification(`${product.name} додано до кошика!`);
      }
      setIsInCart(!isInCart);
    } catch (error) {
      console.error('Error updating cart:', error);
      setNotification('Помилка при оновленні кошика!');
    } finally {
      setTimeout(() => setNotification(''), 3000);
    }
  };

  const handleInputChange = (e) => {
    dispatchEdit({ field: e.target.name, value: e.target.value });
  };

  const handleSaveChanges = async () => {
    const fieldsToUpdate = Object.keys(editedProduct).reduce((acc, key) => {
      if (editedProduct[key] !== product[key]) {
        acc[key] = editedProduct[key];
      }
      return acc;
    }, {});

    if (!Object.keys(fieldsToUpdate).length) {
      setNotification('Немає змін для оновлення!');
      return;
    }

    try {
      await axiosInstance.patch(`/products/${product._id}`, fieldsToUpdate, {
        headers: { 'Content-Type': 'application/json' }
      });
      setNotification('Продукт успішно оновлено!');
      setIsEditing(false);
    } catch (error) {
      console.error('Error updating product:', error);
      setNotification('Помилка при оновленні продукту');
    } finally {
      setTimeout(() => setNotification(''), 3000);
    }
  };

  const updateProductStatus = async (newStatus, successMessage) => {
    try {
      await axiosInstance.patch(
        `/products/${product._id}`,
        { status: newStatus },
        {
          headers: { 'Content-Type': 'application/json' }
        }
      );
      dispatchEdit({ field: 'status', value: newStatus });
      setNotification(successMessage);
    } catch (error) {
      console.error(`Error updating product status to ${newStatus}:`, error);
      setNotification('Помилка при оновленні статусу продукту');
    } finally {
      setTimeout(() => setNotification(''), 3000);
    }
  };

  const handleDeleteProduct = async () => {
    try {
      await axiosInstance.delete(`/products/${product._id}`);
      setNotification('Продукт успішно видалено!');
    } catch (error) {
      console.error('Error deleting product:', error);
      setNotification('Помилка при видаленні продукту');
    } finally {
      setIsDeleteConfirmVisible(false);
      setTimeout(() => setNotification(''), 3000);
    }
  };

  return (
    <div className={scss.productDetails}>
      <div className={scss.container}>
        <div className={scss.namePrice}>
          <Tooltip title="Перейти на сторінку оголошення" placement="top-start">
            <div>
              <h3 className={scss.title}>
                <Link to={`/product/${product._id}`}>{product.name}</Link>
              </h3>
              <div className={scss.location}>
                <TbLocation />
                <p>
                  {product.PLZ} {product.city}
                </p>
              </div>
            </div>
          </Tooltip>
          <CartPrice
            price={product.price}
            exchangeRate={exchangeRate}
            onAddToCart={handleAddToCart}
            isInCart={isInCart}
          />
        </div>

        {isEditing ? (
          <div className={scss.editForm}>
            {['name', 'price', 'city', 'PLZ'].map((field) => (
              <input
                key={field}
                type={field === 'price' ? 'number' : 'text'}
                name={field}
                value={editedProduct[field]}
                onChange={handleInputChange}
                placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                className={`${scss.input} ${isDarkMode ? scss.darkMode : ''}`}
              />
            ))}
            <textarea
              name="description"
              value={editedProduct.description}
              onChange={handleInputChange}
              placeholder="Опис"
              rows="4"
              className={`${scss.textarea} ${isDarkMode ? scss.darkMode : ''}`}
            />
            <div className={scss.buttons}>
              <SubmitButton buttonText="Зберегти" onClick={handleSaveChanges} />
              <SubmitButton
                buttonText="Скасувати"
                onClick={() => setIsEditing(false)}
              />
            </div>
          </div>
        ) : (
          <div>
            <p className={scss.description}>{product.description}</p>
            {currentUser?._id === product.owner && (
              <div className={scss.buttons}>
                <SubmitButton
                  buttonText="Редагувати"
                  onClick={() => setIsEditing(true)}
                />
                <SubmitButton
                  buttonText="Видалити"
                  onClick={() => setIsDeleteConfirmVisible(true)}
                  className={scss.deleteButton}
                />
                {editedProduct.status === 'archive' ? (
                  <SubmitButton
                    buttonText="Активувати"
                    onClick={() =>
                      updateProductStatus(
                        'approved',
                        'Продукт успішно активовано!'
                      )
                    }
                    className={scss.activateButton}
                  />
                ) : (
                  <SubmitButton
                    buttonText="Архівувати"
                    onClick={() =>
                      updateProductStatus(
                        'archive',
                        'Продукт успішно архівовано!'
                      )
                    }
                    className={scss.archiveButton}
                  />
                )}
              </div>
            )}
          </div>
        )}
      </div>

      {notification && (
        <Notification
          message={notification}
          onClose={() => setNotification('')}
        />
      )}

      {isDeleteConfirmVisible && (
        <Confirmation
          message="Ви впевнені, що хочете видалити цей продукт?"
          onConfirm={handleDeleteProduct}
          onCancel={() => setIsDeleteConfirmVisible(false)}
        />
      )}
    </div>
  );
};

export default UserProductsDetails;
