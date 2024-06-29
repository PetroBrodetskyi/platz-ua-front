import React from 'react';
import TitleFavorite from './TitleFavorite/TitleFavorite';
import CartPrice from './CartPrice/CartPrice';
import scss from '../ProductCard/ProductCard.module.scss';
import products from './products.json';

const ProductCard = () => {
  return (
    <>
      {products.map((product) => (
        <li key={product.id} className={scss.productItem}>
          <div className={scss.product}>
            <div className={scss.productImage}>
              <img src={`https://via.placeholder.com/300?text=${product.name}`} alt={product.name} />
            </div>
            <div className={scss.productInfo}>
              <TitleFavorite name={product.name} />
              <p>{product.description}</p>
              <p>{product.condition}</p>
              <CartPrice price={product.price} addedDate={product.addedDate} />
            </div>
          </div>
        </li>
      ))}
    </>
  );
};

export default ProductCard;
