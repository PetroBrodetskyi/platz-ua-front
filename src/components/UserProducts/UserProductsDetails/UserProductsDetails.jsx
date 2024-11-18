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
import scss from './UserProductsDetails.module.scss';

const UserProductsDetails = ({ product }) => {
  const dispatch = useDispatch();
  const exchangeRate = useSelector((state) => state.products.exchangeRate);
  const cartItems = useSelector(selectCartItems);
  const [isInCart, setIsInCart] = useState(
    cartItems.some((item) => item._id === product._id)
  );
  const [notification, setNotification] = useState('');

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
        <div>
          <p className={scss.description}>{product.description}</p>
        </div>
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
