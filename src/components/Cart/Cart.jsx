import { useSelector, useDispatch } from 'react-redux';
import scss from './Cart.module.scss';
import { removeFromCart } from '../../redux/features/cartSlice';

const Cart = () => {
  const cartItems = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();

  const handleRemoveFromCart = (productId) => {
    dispatch(removeFromCart(productId));
  };

  return (
    <div className={scss.cartPage}>
      <h2>Ваш кошик</h2>
      {cartItems.length === 0 ? (
        <p>Ваш кошик порожній.</p>
      ) : (
        <ul className={scss.cartList}>
          {cartItems.map((item) => (
            <li key={item._id} className={scss.cartItem}>
              <img src={item.image1} alt={item.name} className={scss.cartImage} />
              <div className={scss.cartInfo}>
                <p>{item.name}</p>
                <p>€{item.price}</p>
                <button onClick={() => handleRemoveFromCart(item._id)}>Видалити</button> {/* Зміна тексту на українську */}
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Cart;
