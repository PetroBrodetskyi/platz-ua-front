import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import CartPrice from '../../ProductCard/CartPrice/CartPrice';
import { TbLocation } from 'react-icons/tb';
import { fetchExchangeRate } from '../../../redux/features/productsSlice';
import {
  addToCartBack,
  removeFromCartBack,
  selectCartItems
} from '../../../redux/features/cartSlice';
import Tooltip from '@mui/material/Tooltip';
import Notification from '../../Notification/Notification';
import SubmitButton from '../../SubmitButton';
import { selectCurrentUser } from '../../../redux/features/authSlice';
import axiosInstance from '../../../redux/axiosConfig';
import TextField from '@mui/material/TextField';
import { InputAdornment } from '@mui/material';
import scss from './UserProductsDetails.module.scss';

const UserProductsDetails = ({ product }) => {
  const dispatch = useDispatch();
  const exchangeRate = useSelector((state) => state.products.exchangeRate);
  const cartItems = useSelector(selectCartItems);
  const currentUser = useSelector(selectCurrentUser);
  const [isInCart, setIsInCart] = useState(
    cartItems.some((item) => item._id === product._id)
  );
  const [notification, setNotification] = useState('');
  const [isEditing, setIsEditing] = useState(false);

  const [editedProduct, setEditedProduct] = useState({
    name: product.name,
    price: product.price,
    description: product.description,
    city: product.city,
    PLZ: product.PLZ
  });

  useEffect(() => {
    if (!exchangeRate) {
      dispatch(fetchExchangeRate());
    }
  }, [dispatch, exchangeRate]);

  useEffect(() => {
    setIsInCart(cartItems.some((item) => item._id === product._id));
  }, [cartItems, product._id]);

  const handleAddToCart = async () => {
    if (isInCart) {
      await dispatch(removeFromCartBack(product._id));
      setNotification(`${product.name} видалено з кошика!`);
      setIsInCart(false);
    } else {
      await dispatch(addToCartBack(product));
      setNotification(`${product.name} додано до кошика!`);
      setIsInCart(true);
    }
    setTimeout(() => setNotification(''), 3000);
  };

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedProduct((prev) => ({ ...prev, [name]: value }));
  };

  const handleSaveChanges = async () => {
    const fieldsToUpdate = {};
    for (const key in editedProduct) {
      if (editedProduct[key] !== product[key]) {
        fieldsToUpdate[key] = editedProduct[key];
      }
    }

    if (Object.keys(fieldsToUpdate).length === 0) {
      setNotification('Немає змін для оновлення!');
      return;
    }

    try {
      const response = await axiosInstance.patch(
        `/products/${product._id}`,
        fieldsToUpdate,
        {
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );
      setNotification('Продукт успішно оновлено!');
      setIsEditing(false);
      setTimeout(() => setNotification(''), 3000);
    } catch (error) {
      console.error('Error updating product:', error);
      setNotification('Помилка при оновленні продукту');
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
          <div>
            <CartPrice
              price={product.price}
              exchangeRate={exchangeRate}
              onAddToCart={handleAddToCart}
              isInCart={isInCart}
            />
          </div>
        </div>

        {isEditing ? (
          <div className={scss.editForm}>
            <TextField
              label="Назва продукту"
              name="name"
              value={editedProduct.name}
              onChange={handleInputChange}
              variant="outlined"
              fullWidth
              margin="normal"
            />
            <TextField
              label="Опис"
              name="description"
              value={editedProduct.description}
              onChange={handleInputChange}
              variant="outlined"
              fullWidth
              margin="normal"
              multiline
              rows={4}
            />
            <TextField
              label="Ціна"
              name="price"
              value={editedProduct.price}
              onChange={handleInputChange}
              variant="outlined"
              fullWidth
              margin="normal"
              type="number"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">€</InputAdornment>
                )
              }}
            />
            <TextField
              label="Місто"
              name="city"
              value={editedProduct.city}
              onChange={handleInputChange}
              variant="outlined"
              fullWidth
              margin="normal"
            />
            <TextField
              label="PLZ"
              name="PLZ"
              value={editedProduct.PLZ}
              onChange={handleInputChange}
              variant="outlined"
              fullWidth
              margin="normal"
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
            {currentUser && currentUser._id === product.owner && (
              <SubmitButton buttonText="Редагувати" onClick={handleEditClick} />
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
    </div>
  );
};

export default UserProductsDetails;
