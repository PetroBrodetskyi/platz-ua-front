import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
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

      const serverCartItems = await dispatch(fetchProductsInCart()).unwrap();
      if (storedCart && storedCart.length !== serverCartItems.length) {
        localStorage.setItem('cart', JSON.stringify(serverCartItems));
        dispatch(setCartItems(serverCartItems));
      }
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

  return (
    <div className={scss.cart}>
      {loadingRemove && <Loader />}
      <h1>Кошик</h1>
      {validCartItems.length === 0 ? (
        <p>Ваш кошик порожній</p>
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
