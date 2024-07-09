import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchProducts } from '../../redux/features/productsSlice';
import { FaTrash } from 'react-icons/fa';
import scss from './Favorites.module.scss';
import { toggleFavorite } from '../../redux/features/favoritesSlice';

const Favorites = () => {
  const dispatch = useDispatch();
  const favorites = useSelector((state) => state.favorites.items);
  const products = useSelector((state) => state.products.products);
  const loading = useSelector((state) => state.products.loading);

  useEffect(() => {
    if (products.length === 0) {
      dispatch(fetchProducts());
    }
  }, [dispatch, products.length]);

  const favoriteProducts = products.filter(product => favorites.includes(product._id));

  const handleRemoveFromFavorites = (productId) => {
    console.log('Remove product with ID:', productId);
    dispatch(toggleFavorite(productId));
  };

  return (
    <div className={scss.favorite}>
      <h1>Обрані товари</h1>
      {favoriteProducts.length === 0 ? (
        <p>У вас немає обраних товарів.</p>
      ) : (
        <ul>
          {favoriteProducts.map((product) => (
            <li key={product._id} className={scss.favoriteItem}>
              <h2>{product.name}</h2>
              <p>{product.description}</p>
              <img src={product.image1} alt={product.name} className={scss.productImage} />
              <div>
                <p>Ціна: {product.price}</p>
                <p>Стан: {product.condition}</p>
                <button
                  onClick={() => handleRemoveFromFavorites(product._id)}
                  className={scss.removeButton}
                >
                  Видалити <FaTrash className={scss.trashIcon} />
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Favorites;
