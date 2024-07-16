import React from 'react';
import scss from './ProductInfo.module.scss';
import CartPrice from '../../ProductCard/CartPrice/CartPrice';

const ProductInfo = ({ product, exchangeRate }) => {
  const formattedDate = new Date(product.createdAt).toLocaleDateString();

  return (
    <div className={scss.details}>
      <div className={scss.namePrice}>
        <h2>{product.name}</h2>
        {exchangeRate !== null && (
        <div className={scss.priceContainer}>
          <CartPrice price={product.price} exchangeRate={exchangeRate} />
        </div>
      )}
      </div>
      <p>Опис: {product.description}</p>
      <p>Стан: {product.condition}</p>
      <p>Оновлено: {formattedDate}</p>
      <p>PLZ: {product.PLZ}</p>
      <p>Місто: {product.city}</p>
      
    </div>
  );
};

export default ProductInfo;
