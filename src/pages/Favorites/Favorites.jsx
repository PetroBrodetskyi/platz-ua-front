import { useState, useEffect } from 'react';
import ProductCard from '../../components/ProductCard/ProductCard';
import scss from './Favorites.module.scss';

const Favorites = () => {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const savedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
    setFavorites(savedFavorites);
  }, []);

  const updateFavorites = (updatedFavorites) => {
    setFavorites(updatedFavorites);
    localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
  };

  const removeFromFavorites = (productId) => {
    const updatedFavorites = favorites.filter((favId) => favId !== productId);
    updateFavorites(updatedFavorites);
  };

  return (
    <div className={scss.favorites}>
      <h2>Favorite Products</h2>
      <ul className={scss.favoriteList}>
        {favorites.length === 0 ? (
          <p>No favorite products yet.</p>
        ) : (
          favorites.map((productId) => (
            <li key={productId} className={scss.favoriteItem}>
              <ProductCard
                productId={productId}
                removeFromFavorites={removeFromFavorites}
              />
            </li>
          ))
        )}
      </ul>
    </div>
  );
};

export default Favorites;
