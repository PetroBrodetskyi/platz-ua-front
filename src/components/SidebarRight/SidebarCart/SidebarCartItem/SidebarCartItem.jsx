import { useTheme } from '../../../../context/ThemeContext';
import scss from './SidebarCartItem.module.scss';

const SidebarCartItem = ({ product, onRemove, onProductClick }) => {
  const handleBuyClick = () => {
    onProductClick(product._id);
  };

  const { isDarkMode } = useTheme();

  return (
    <div className={`${scss.cartItem} ${isDarkMode ? scss.darkMode : ''}`}>
      <img
        src={product.image1}
        alt={product.name}
        className={scss.productImage}
        onClick={() => onProductClick(product._id)}
      />
      <div className={scss.productDetails}>
        <div>
          <div
            onClick={() => onProductClick(product._id)}
            className={scss.productName}
          >
            <h4 className={scss.title}>{product.name}</h4>
            <p>€{product.price}</p>
          </div>
          <div>
            <p>
              {product.PLZ} {product.city}
            </p>
          </div>
        </div>
        <div className={scss.actions}>
          <button className={scss.buyButton} onClick={handleBuyClick}>
            Купити
          </button>
          <button
            className={scss.removeButton}
            onClick={() => onRemove(product._id)}
          >
            Видалити
          </button>
        </div>
      </div>
    </div>
  );
};

export default SidebarCartItem;
