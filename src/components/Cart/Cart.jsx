import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import scss from './Cart.module.scss';
import { removeFromCart } from '../../redux/features/cartSlice';
import { fetchProducts, fetchExchangeRate } from '../../redux/features/productsSlice';
import CartItem from './CartItem/CartItem';
import { ConfirmationLogin } from '../Confirmation/Confirmation';  // Імпорт компонента Confirmation

const Cart = () => {
  const [showConfirmation, setShowConfirmation] = useState(false); // Стан для показу підтвердження
  const cartItems = useSelector((state) => state.cart.items);
  const { exchangeRate } = useSelector((state) => state.products);
  const currentUser = useSelector((state) => state.auth.user);  // Перевірка авторизації
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchProducts());
    dispatch(fetchExchangeRate());

    if (!currentUser) {
      setShowConfirmation(true); // Показати підтвердження, якщо користувач не авторизований
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
    navigate('/login'); // Перенаправлення на сторінку логіну
  };

  const handleCancel = () => {
    setShowConfirmation(false); // Закрити підтвердження, якщо користувач вибирає "Пізніше"
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
