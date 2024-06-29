import React, { useState } from 'react';
import TitleFavorite from './TitleFavorite/TitleFavorite';
import CartPrice from './CartPrice/CartPrice';
import scss from '../ProductCard/ProductCard.module.scss';
import products from './products.json';

const ProductCard = () => {
  const [favorites, setFavorites] = useState([]);

  const toggleFavorite = (productId) => {
    if (favorites.includes(productId)) {
      setFavorites(favorites.filter((id) => id !== productId));
    } else {
      setFavorites([...favorites, productId]);
    }
  };

  return (
    <>
      {products.map((product) => (
        <li key={product.id} className={scss.productItem}>
          <div className={scss.product}>
            <div className={scss.productImage}>
              <img
                src={`https://via.placeholder.com/300?text=${product.name}`}
                alt={product.name}
              />
            </div>
            <div className={scss.productInfo}>
              <TitleFavorite
                name={product.name}
                id={product.id}
                onFavoriteToggle={toggleFavorite}
                isFavorite={favorites.includes(product.id)}
              />
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
