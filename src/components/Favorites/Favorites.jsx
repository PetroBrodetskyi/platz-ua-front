import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { MdOutlineFavorite, MdOutlineFavoriteBorder } from 'react-icons/md';
import { fetchProducts } from '../../redux/features/productsSlice';
import { FaTrash } from 'react-icons/fa';
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
        <ul>
          {favoriteProducts.map((product) => (
            <li key={product._id} className={scss.favoriteItem}>
              <Link to={`/product/${product._id}`}>
                <h2>{product.name}</h2>
                <img
                  src={product.image1}
                  alt={product.name}
                  className={scss.productImage}
                />
              </Link>
              <p>{product.description}</p>
              <p>{product.PLZ}</p>
              <p>{product.city}</p>
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
