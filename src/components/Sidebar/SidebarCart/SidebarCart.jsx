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
    navigate(`/product/${productId}`);
  };

  return (
    <div className={scss.sidebarCart}>
      {loading ? (
        <p>Завантаження...</p>
      ) : cartItems.length === 0 ? (
        <p>Ваш кошик порожній</p>
      ) : (
        <ul className={scss.cartList}>
          {cartItems.map((item) => (
            <li key={item._id}>
              <SidebarCartItem
                item={item}
                onRemove={handleRemoveFromCart}
                onProductClick={handleProductClick}
                onAdd={handleAddToCart}
              />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default memo(SidebarCart);
