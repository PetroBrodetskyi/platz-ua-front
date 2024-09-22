import scss from './SidebarCartItem.module.scss';
import { useNavigate } from 'react-router-dom';

const SidebarCartItem = ({ item, onRemove, onProductClick }) => {
  const navigate = useNavigate();

  const handleBuyClick = () => {
    navigate('/cart');
  };

  return (
    <li className={scss.cartItem}>
      <img
        src={item.image1}
        alt={item.name}
        className={scss.productImage}
        onClick={() => onProductClick(item._id)}
      />
      <div className={scss.productDetails}>
        <p onClick={() => onProductClick(item._id)} className={scss.productName}>
          {item.name}
        </p>
        <div className={scss.actions}>
          <button className={scss.buyButton} onClick={handleBuyClick}>
            Купити
          </button>
          <button className={scss.removeButton} onClick={() => onRemove(item._id)}>
            Видалити
          </button>
        </div>
      </div>
    </li>
  );
};

export default SidebarCartItem;
