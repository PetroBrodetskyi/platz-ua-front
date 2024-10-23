import { useState } from 'react';
import ProductDetails from '../UserProductsDetails/UserProductsDetails';
import scss from './ProductItem.module.scss';

const ProductItem = ({ product, exchangeRate }) => {
  const [selectedImage] = useState(product.image1);

  return (
    <li className={scss.productsItem}>
      <div className={scss.imageDetails}>
        <img
          className={scss.image}
          src={selectedImage}
          alt={`${product.name} selected image`}
        />

        <div className={scss.detailsContainer}>
          <ProductDetails product={product} exchangeRate={exchangeRate} />
        </div>
      </div>
    </li>
  );
};

export default ProductItem;
