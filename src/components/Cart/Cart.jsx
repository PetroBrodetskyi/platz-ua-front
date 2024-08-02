import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import scss from './Cart.module.scss';
import { removeFromCart } from '../../redux/features/cartSlice';
import { fetchProducts, fetchExchangeRate } from '../../redux/features/productsSlice';
import CartItem from './CartItem/CartItem';

const Cart = () => {
  const cartItems = useSelector((state) => state.cart.items);
  const { exchangeRate } = useSelector((state) => state.products);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchProducts());
    dispatch(fetchExchangeRate());
  }, [dispatch]);

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
    </div>
  );
};

export default Cart;
