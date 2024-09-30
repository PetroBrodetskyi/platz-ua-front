import scss from './SidebarCartItem.module.scss';

const SidebarCartItem = ({ item, onRemove, onProductClick }) => {
  const handleBuyClick = () => {
    onProductClick(item._id);
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
        <div>
          <div
            onClick={() => onProductClick(item._id)}
            className={scss.productName}
          >
            <h4 className={scss.title}>{item.name}</h4>
            <p>€{item.price}</p>
          </div>
          <div>
            <p>
              {item.PLZ} {item.city}
            </p>
          </div>
        </div>
        <div className={scss.actions}>
          <button className={scss.buyButton} onClick={handleBuyClick}>
            Купити
          </button>
          <button
            className={scss.removeButton}
            onClick={() => onRemove(item._id)}
          >
            Видалити
          </button>
        </div>
      </div>
    </li>
  );
};

export default SidebarCartItem;
