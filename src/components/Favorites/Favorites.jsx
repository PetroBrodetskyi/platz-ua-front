import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { MdOutlineFavoriteBorder } from 'react-icons/md';
import { fetchProducts } from '../../redux/features/productsSlice';
import scss from './Favorites.module.scss';
import { toggleFavorite } from '../../redux/features/favoritesSlice';
import RandomCards from '../RandomCards/RandomCards';

const Favorites = () => {
  const dispatch = useDispatch();
  const favorites = useSelector((state) => state.favorites.items);
  const products = useSelector((state) => state.products.products);

  useEffect(() => {
    if (products.length === 0) {
      dispatch(fetchProducts());
    }
  }, [dispatch, products.length]);

  const favoriteProducts = favorites
    .map((favId) => products.find((product) => product._id === favId))
    .filter((product) => product !== undefined)
    .reverse();

  const handleRemoveFromFavorites = (productId) => {
    console.log('Видалення товару з ID:', productId);
    dispatch(toggleFavorite(productId));
  };

  return (
    <div className={scss.favorite}>
      <h3>Обрані товари</h3>
      {favoriteProducts.length === 0 ? (
        <div className={scss.favoriteEmpty}>
          <div className={scss.favoriteInfo}>
            <p className={scss.text}>У вас немає обраних</p>
            <MdOutlineFavoriteBorder className={scss.icon} />
          </div>
          <h3>Вас можуть зацікавити</h3>
          <RandomCards />
        </div>
      ) : (
        <ul className={scss.favoriteList}>
          {favoriteProducts.map((product) => (
            <li key={product._id} className={scss.favoriteItem}>
              <Link
                className={scss.favoriteItemInfo}
                to={`/product/${product._id}`}
              >
                <h4>{product.name}</h4>
                <img
                  src={product.image1}
                  alt={product.name}
                  className={scss.productImage}
                />
              </Link>
              <div className={scss.description}>
                <p>{product.description}</p>
              </div>
              <div>
                <p>{product.PLZ}</p>
                <p>{product.city}</p>
              </div>
              <div>
                <p>Ціна: {product.price}</p>
                <p>Стан: {product.condition}</p>
                <button
                  onClick={() => handleRemoveFromFavorites(product._id)}
                  className={scss.removeButton}
                >
                  Видалити
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
