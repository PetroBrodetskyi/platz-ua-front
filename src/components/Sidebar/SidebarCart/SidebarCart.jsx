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
import { TransitionGroup } from 'react-transition-group'; // Імпорт TransitionGroup
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

  const handleProductClick = (productId) => {
    navigate(`/cart`);
  };

  return (
    <div className={scss.sidebarCart}>
      {cartItems.length === 0 ? (
        <p>Ваш кошик порожній</p>
      ) : (
        <ul className={scss.cartList}>
          <TransitionGroup>
            {cartItems.map((item) => (
              <Collapse key={item._id} timeout={500}>
                <SidebarCartItem
                  item={item}
                  onRemove={handleRemoveFromCart}
                  onProductClick={handleProductClick}
                  onAdd={handleAddToCart}
                />
              </Collapse>
            ))}
          </TransitionGroup>
        </ul>
      )}
    </div>
  );
};

export default memo(SidebarCart);
