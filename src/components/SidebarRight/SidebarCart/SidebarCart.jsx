import { memo, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  removeFromCartBack,
  fetchProductsInCart,
  selectCartItems,
  addToCart
} from '../../../redux/features/cartSlice';
import SidebarCartItem from './SidebarCartItem';
import { Collapse } from '@mui/material';
import { TransitionGroup } from 'react-transition-group';
import { useTheme } from '../../../../src/context/ThemeContext';
import scss from './SidebarCart.module.scss';

const SidebarCart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cartItems = useSelector(selectCartItems);
  const { isDarkMode } = useTheme();

  useEffect(() => {
    dispatch(fetchProductsInCart());
  }, [dispatch]);

  const handleAddToCart = useCallback(
    (product) => dispatch(addToCart(product)),
    [dispatch]
  );

  const handleRemoveFromCart = useCallback(
    async (productId) => {
      await dispatch(removeFromCartBack(productId));
      dispatch(fetchProductsInCart());
    },
    [dispatch]
  );

  const handleProductClick = useCallback(() => navigate('/cart'), [navigate]);

  if (!cartItems.length) {
    return (
      <div className={`${scss.sidebarCart} ${isDarkMode ? scss.darkMode : ''}`}>
        <p>Ваш кошик порожній</p>
      </div>
    );
  }

  return (
    <div className={`${scss.sidebarCart} ${isDarkMode ? scss.darkMode : ''}`}>
      <ul>
        <TransitionGroup className={scss.list}>
          {cartItems.map((product) => (
            <Collapse key={product._id} timeout={500}>
              <li>
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
    </div>
  );
};

export default memo(SidebarCart);
