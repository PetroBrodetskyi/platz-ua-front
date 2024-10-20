import { memo, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  removeFromCartBack,
  fetchProductsInCart,
  selectCartItems,
  selectCartLoading,
  addToCart
} from '../../../redux/features/cartSlice';
import SidebarCartItem from './SidebarCartItem/SidebarCartItem';
import { Collapse } from '@mui/material';
import { TransitionGroup } from 'react-transition-group';
import { useTheme } from '../../../../src/context/ThemeContext';
import scss from './SidebarCart.module.scss';

const SidebarCart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cartItems = useSelector(selectCartItems);
  const loading = useSelector(selectCartLoading);

  useEffect(() => {
    dispatch(fetchProductsInCart());
  }, [dispatch]);

  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
  };

  const handleRemoveFromCart = async (productId) => {
    await dispatch(removeFromCartBack(productId));
    dispatch(fetchProductsInCart());
  };

  const handleProductClick = () => {
    navigate('/cart');
  };

  const { isDarkMode } = useTheme();

  return (
    <div className={`${scss.sidebarCart} ${isDarkMode ? scss.darkMode : ''}`}>
      {cartItems.length === 0 ? (
        <p>Ваш кошик порожній</p>
      ) : (
        <ul>
          <TransitionGroup className={scss.list}>
            {cartItems.map((product) => (
              <Collapse key={product._id} timeout={500}>
                <li key={product._id}>
                  <SidebarCartItem
                    product={product}
                    onRemove={handleRemoveFromCart}
                    onProductClick={handleProductClick}
                    onAdd={handleAddToCart}
                  />
                </li>
              </Collapse>
            ))}
          </TransitionGroup>
        </ul>
      )}
    </div>
  );
};

export default memo(SidebarCart);
