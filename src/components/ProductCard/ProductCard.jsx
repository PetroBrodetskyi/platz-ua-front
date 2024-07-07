import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TitleFavorite from './TitleFavorite/TitleFavorite';
import CartPrice from './CartPrice/CartPrice';
import scss from './ProductCard.module.scss';

const ProductCard = () => {
  const [products, setProducts] = useState([]);
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/products/public');
        setProducts(response.data);

        const initialFavorites = response.data.filter(product => product.favorite);
        setFavorites(initialFavorites.map(product => product._id));
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  const toggleFavorite = (productId) => {
    if (favorites.includes(productId)) {
      setFavorites(favorites.filter((id) => id !== productId));
    } else {
      setFavorites([...favorites, productId]);
    }
  };

  return (
    <ul className={scss.list}>
      {products.map((product) => (
        <li key={product._id} className={scss.productItem}>
          <div className={scss.product}>
            <div className={scss.productImage}>
              <img
                src={product.image1}
                alt={product.name}
              />
            </div>
            <div className={scss.productInfo}>
              <TitleFavorite
                name={product.name}
                id={product._id}
                onFavoriteToggle={toggleFavorite}
                isFavorite={favorites.includes(product._id)}
              />
              <p>{product.description}</p>
              <p>{product.condition}</p>
              <CartPrice price={product.price} addedDate={product.addedDate} />
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default ProductCard;
