import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchProducts } from '../../redux/features/productsSlice';
import scss from './Favorites.module.scss';

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

  if (loading) {
    return <div>Завантаження...</div>;
  }

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
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Favorites;
