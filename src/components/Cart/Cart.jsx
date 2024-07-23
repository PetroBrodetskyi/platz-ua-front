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
                <h3>{item.name}</h3>
                <p>{item.description}</p>
                <p>€{item.price}</p>
                <div className={scss.ownerInfo}>
                  <h3>Продавець: {item.owner.name}</h3>
                  <p>Телефон: {item.owner.phone}</p>
                  <img src={item.owner.avatarURL} alt={item.owner.name} className={scss.ownerAvatar} />
                </div>
                <button onClick={() => handleRemoveFromCart(item._id)}>Видалити</button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Cart;
