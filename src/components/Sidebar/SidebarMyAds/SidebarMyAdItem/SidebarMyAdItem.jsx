import { useNavigate } from "react-router-dom";
import { memo } from "react";
import scss from "./SidebarMyAdItem.module.scss";

const SidebarMyAdItem = ({ product, onRemove }) => {
  const navigate = useNavigate();

  const handleProductClick = () => {
    navigate(`/product/${product._id}`);
  };

  return (
    <li className={scss.myAdItem}>
      <img
        src={product.image1}
        alt={product.name}
        className={scss.productImage}
        onClick={handleProductClick}
      />
      <div className={scss.productDetails}>
        <div onClick={handleProductClick} className={scss.productName}>
          <h4 className={scss.title}>{product.name}</h4>
          <p>€{product.price}</p>
        </div>
        <div>
          <p>
            {product.PLZ} {product.city}
          </p>
        </div>
        <div className={scss.actions}>
          <button className={scss.viewButton} onClick={handleProductClick}>
            Переглянути
          </button>
          <button
            className={scss.removeButton}
            onClick={() => onRemove(product._id)}
          >
            Видалити
          </button>
        </div>
      </div>
    </li>
  );
};

export default memo(SidebarMyAdItem);
