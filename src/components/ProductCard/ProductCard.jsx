import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TitleFavorite from './TitleFavorite/TitleFavorite';
import CartPrice from './CartPrice/CartPrice';
import Loader from '../Loader/Loader';
import scss from './ProductCard.module.scss';

const ProductCard = () => {
  const [products, setProducts] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [exchangeRate, setExchangeRate] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await axios.get('https://platz-ua-back.vercel.app/api/products/public');
        setProducts(response.data);

        const initialFavorites = response.data.filter(product => product.favorite);
        setFavorites(initialFavorites.map(product => product._id));
      } catch (error) {
        console.error('Помилка при отриманні продуктів:', error);
      } finally {
        setLoading(false);
      }
    };

    const fetchExchangeRate = async () => {
      try {
        setLoading(true);
        const response = await axios.get('https://platz-ua-back.vercel.app/api/exchange-rate');
        setExchangeRate(parseFloat(response.data.sale));
      } catch (error) {
        console.error('Помилка при отриманні курсу обміну:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
    fetchExchangeRate();
  }, []);

  const toggleFavorite = (productId) => {
    if (favorites.includes(productId)) {
      setFavorites(favorites.filter((id) => id !== productId));
    } else {
      setFavorites([...favorites, productId]);
    }
  };

  if (loading) {
    return <Loader />;
  }

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
              <div>
                <TitleFavorite
                  name={product.name}
                  id={product._id}
                  onFavoriteToggle={toggleFavorite}
                  isFavorite={favorites.includes(product._id)}
                />
                <p>{product.description}</p>
              </div>
              <div>
                <p>{product.condition}</p>
                {exchangeRate !== null && (
                  <CartPrice 
                    price={product.price} 
                    addedDate={product.addedDate} 
                    exchangeRate={exchangeRate} 
                  />
                )}
              </div>
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default ProductCard;
