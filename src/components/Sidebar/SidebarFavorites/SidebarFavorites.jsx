import { useSelector, useDispatch } from 'react-redux';
import { Collapse } from '@mui/material';
import { TransitionGroup } from 'react-transition-group';
import { toggleFavorite } from '../../../redux/features/favoritesSlice';
import SidebarFavoriteItem from '../SidebarFavoriteItem/SidebarFavoriteItem';
import scss from './SidebarFavorites.module.scss';

const SidebarFavorites = () => {
  const dispatch = useDispatch();
  const favorites = useSelector((state) => state.favorites.items);
  const products = useSelector((state) => state.products.products);

  const favoriteProducts = favorites
    .map((favId) => products.find((product) => product._id === favId))
    .filter((product) => product !== undefined)
    .reverse();

  const handleRemoveFromFavorites = (productId) => {
    dispatch(toggleFavorite(productId));
  };

  return (
    <div className={scss.sidebarFavorites}>
      {favoriteProducts.length === 0 ? (
        <p>У вас немає обраних товарів</p>
      ) : (
        <ul className={scss.favoriteList}>
          <TransitionGroup className={scss.list}>
            {favoriteProducts.map((product) => (
              <Collapse key={product._id} timeout={500}>
                <SidebarFavoriteItem
                  product={product}
                  onRemove={handleRemoveFromFavorites}
                />
              </Collapse>
            ))}
          </TransitionGroup>
        </ul>
      )}
    </div>
  );
};

export default SidebarFavorites;
