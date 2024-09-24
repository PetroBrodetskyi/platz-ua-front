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
  const [validCartItems, setValidCartItems] = useState([]);
  const cartItems = useSelector((state) => state.cart.items);
  const { products, exchangeRate } = useSelector((state) => state.products);
  const currentUser = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        await dispatch(fetchProducts({ page: 1 }));
        await dispatch(fetchExchangeRate());
      } catch (error) {
        console.error("Failed to fetch products or exchange rate", error);
      }
    };

    fetchData();
  }, [dispatch]);

  useEffect(() => {
    const filteredCartItems = cartItems.filter(item => products.some(product => product._id === item._id));
    
    setValidCartItems(filteredCartItems);

    const invalidCartItems = cartItems.filter(item => !products.some(product => product._id === item._id));
    invalidCartItems.forEach(item => dispatch(removeFromCart(item._id)));

  }, [cartItems, products, dispatch]);

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
      {validCartItems.length === 0 ? (
        <p>Ваш кошик порожній.</p>
      ) : (
        <ul className={scss.cartList}>
          {validCartItems.map((item) => (
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
