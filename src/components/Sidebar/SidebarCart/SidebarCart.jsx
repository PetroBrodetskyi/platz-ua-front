// src/components/SidebarCart/SidebarCart.jsx

import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import scss from './SidebarCart.module.scss';
import { removeFromCart } from '../../../redux/features/cartSlice';
import SidebarCartItem from '../SidebarCartItem/SidebarCartItem';
import { ConfirmationLogin } from '../../Confirmation/Confirmation';

const SidebarCart = () => {
  const [showConfirmation, setShowConfirmation] = useState(false);
  const cartItems = useSelector((state) => state.cart.items);
  const currentUser = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const confirmationShown = localStorage.getItem('confirmationShown');

    if (!currentUser) {
      if (!confirmationShown) {
        setShowConfirmation(true);
        localStorage.setItem('confirmationShown', 'true');
      }
    } else {
      setShowConfirmation(false);
      localStorage.removeItem('confirmationShown');
    }
  }, [currentUser]);

  const handleRemoveFromCart = (productId) => {
    dispatch(removeFromCart(productId));
  };

  const handleProductClick = (productId) => {
    navigate(`/product/${productId}`);
  };

  return (
    <div className={scss.sidebarCart}>
      
      {cartItems.length === 0 ? (
        <p>Ваш кошик порожній.</p>
      ) : (
        <ul className={scss.cartList}>
          {cartItems.map((item) => (
            <SidebarCartItem
              key={item._id}
              item={item}
              onRemove={handleRemoveFromCart}
              onProductClick={handleProductClick}
            />
          ))}
        </ul>
      )}
      {showConfirmation && (
        <ConfirmationLogin
          message="Зареєструйтеся або увійдіть, щоб відправити замовлення"
          onConfirm={() => navigate('/login')}
          onCancel={() => setShowConfirmation(false)}
        />
      )}
    </div>
  );
};

export default SidebarCart;
