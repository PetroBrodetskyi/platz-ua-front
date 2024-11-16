import { useState } from 'react';
import { Link } from 'react-router-dom';
import ProductDetails from '../UserProductsDetails/UserProductsDetails';
import { useTheme } from '../../../context/ThemeContext';
import scss from './ProductItem.module.scss';

const ProductItem = ({ product, exchangeRate }) => {
  const [selectedImage] = useState(product.image1);
  const { isDarkMode } = useTheme();

  return (
    <li className={scss.productItem}>
      <div className={`${scss.product} ${isDarkMode ? scss.darkMode : ''}`}>
        <div className={scss.productImage}>
          <Link to={`/product/${product._id}`}>
            <img
              className={scss.image}
              src={selectedImage}
              alt={`${product.name} selected image`}
            />
          </Link>
        </div>
        <div className={scss.productInfo}>
          <ProductDetails product={product} exchangeRate={exchangeRate} />
        </div>
      </div>
    </li>
  );
};

export default ProductItem;
