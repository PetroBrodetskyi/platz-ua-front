import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import scss from './Cart.module.scss';
import { removeFromCart } from '../../redux/features/cartSlice';
import { fetchProducts, fetchExchangeRate } from '../../redux/features/productsSlice';
import CartItem from './CartItem/CartItem';
import { ConfirmationLogin } from '../Confirmation/Confirmation';

const Cart = () => {
  const [showConfirmation, setShowConfirmation] = useState(false);
  const cartItems = useSelector((state) => state.cart.items);
  const { exchangeRate } = useSelector((state) => state.products);
  const currentUser = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchProducts());
    dispatch(fetchExchangeRate());

    if (!currentUser) {
      setShowConfirmation(true);
    }
  }, [dispatch, currentUser]);

  const handleRemoveFromCart = (productId) => {
    dispatch(removeFromCart(productId));
  };

  const handleProductClick = (productId) => {
    navigate(`/product/${productId}`);
  };

  const handleSubmitOrder = (event, itemId) => {
    event.preventDefault();
    console.log("Order submitted for item:", itemId);
  };

  const handleConfirm = () => {
    setShowConfirmation(false);
    navigate('/login');
  };

  const handleCancel = () => {
    setShowConfirmation(false);
  };

  return (
    <div className={scss.cart}>
      <h2>Ваш кошик</h2>
      {cartItems.length === 0 ? (
        <p>Ваш кошик порожній.</p>
      ) : (
        <ul className={scss.cartList}>
          {cartItems.map((item) => (
            <CartItem 
              key={item._id} 
              item={item} 
              onRemove={handleRemoveFromCart} 
              onProductClick={handleProductClick} 
              exchangeRate={exchangeRate} 
              onSubmitOrder={handleSubmitOrder} 
            />
          ))}
        </ul>
      )}
      {showConfirmation && (
        <ConfirmationLogin 
          message="Зареєструйтеся або увійдіть, щоб відправити замовлення"
          onConfirm={handleConfirm}
          onCancel={handleCancel}
        />
      )}
    </div>
  );
};

export default Cart;
