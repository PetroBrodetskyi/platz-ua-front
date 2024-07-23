import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import scss from './Cart.module.scss';
import { removeFromCart } from '../../redux/features/cartSlice';
import { RiDeleteBin4Line } from "react-icons/ri";
import { fetchProducts, fetchExchangeRate } from '../../redux/features/productsSlice';

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

  return (
    <div className={scss.cart}>
      <h2>Ваш кошик</h2>
      {cartItems.length === 0 ? (
        <p>Ваш кошик порожній.</p>
      ) : (
        <ul className={scss.cartList}>
          {cartItems.map((item) => (
            <li key={item._id} className={scss.cartItem}>
              <div className={scss.titleImage}>
                <h3 className={scss.titleProduct} onClick={() => handleProductClick(item._id)}>{item.name}</h3>
                <img
                  src={item.image1}
                  alt={item.name}
                  className={scss.cartImage}
                  onClick={() => handleProductClick(item._id)}
                />
              </div>
              <div className={scss.cartInfo}>
                <p>{item.description}</p>
                <p>€{item.price}</p>
                {exchangeRate !== null && (
                  <p>₴{(item.price * exchangeRate).toFixed(2)}</p>
                )}
                <div className={scss.ownerInfo}>
                  <h3>Продавець: {item.owner.name}</h3>
                  <p>Телефон: {item.owner.phone}</p>
                  <img src={item.owner.avatarURL} alt={item.owner.name} className={scss.ownerAvatar} />
                </div>
                <button onClick={() => handleRemoveFromCart(item._id)}><RiDeleteBin4Line className={scss.icon}/></button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Cart;
