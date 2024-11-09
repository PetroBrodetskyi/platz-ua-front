import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { PiShoppingCart } from 'react-icons/pi';
import {
  removeFromCartBack,
  fetchProductsInCart,
  setCartItems
} from '../../redux/features/cartSlice';
import {
  fetchProducts,
  fetchExchangeRate
} from '../../redux/features/productsSlice';
import CartItem from './CartItem/CartItem';
import Loader from '../Loader/Loader';
import { ConfirmationLogin } from '../Confirmation/Confirmation';
import RandomCards from '../RandomCards/RandomCards';
import { useTheme } from '../../context/ThemeContext';
import scss from './Cart.module.scss';

const Cart = () => {
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [loadingRemove, setLoadingRemove] = useState(false);
  const cartItems = useSelector((state) => state.cart.items);
  const { products, exchangeRate } = useSelector((state) => state.products);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem('cart'));
    if (storedCart) {
      dispatch(setCartItems(storedCart));
    }

    const fetchData = async () => {
      await Promise.all([
        dispatch(fetchProducts({ page: 1 })),
        dispatch(fetchExchangeRate())
      ]);
      await dispatch(fetchProductsInCart());
    };

    fetchData();
  }, [dispatch]);

  const validCartItems = cartItems.filter((item) =>
    products.some((product) => product._id === item._id)
  );

  const handleRemoveFromCart = async (productId) => {
    setLoadingRemove(true);
    await dispatch(removeFromCartBack(productId));

    const updatedCartItems = await dispatch(fetchProductsInCart()).unwrap();
    localStorage.setItem('cart', JSON.stringify(updatedCartItems));
    dispatch(setCartItems(updatedCartItems));
    setLoadingRemove(false);
  };

  const handleProductClick = (productId) => {
    navigate(`/product/${productId}`);
  };

  const handleSubmitOrder = (event, itemId) => {
    event.preventDefault();
    console.log('Order submitted for item:', itemId);
  };

  const handleConfirm = () => {
    setShowConfirmation(false);
    navigate('/auth');
  };

  const { isDarkMode } = useTheme();

  return (
    <div className={scss.cart}>
      {loadingRemove && <Loader />}
      <h3>Кошик</h3>
      {validCartItems.length === 0 ? (
        <div className={scss.cartEmpty}>
          <div
            className={`${scss.cartInfo} ${isDarkMode ? scss.darkMode : ''}`}
          >
            <p className={scss.text}>Ваш кошик порожній</p>
            <PiShoppingCart className={scss.icon} />
          </div>
          <h3>Вас можуть зацікавити</h3>
          <RandomCards />
        </div>
      ) : (
        validCartItems.map((item) => (
          <CartItem
            key={item._id}
            item={item}
            onRemove={handleRemoveFromCart}
            onProductClick={handleProductClick}
            onOrderSubmit={handleSubmitOrder}
            onShowConfirmation={() => setShowConfirmation(true)}
          />
        ))
      )}
      {showConfirmation && (
        <ConfirmationLogin
          message="Ви повинні увійти, щоб продовжити"
          onConfirm={handleConfirm}
          onClose={() => setShowConfirmation(false)}
        />
      )}
    </div>
  );
};

export default Cart;
