import { memo, useMemo } from 'react';
import SidebarFavoriteItem from './SidebarFavoriteItem/SidebarFavoriteItem';
import { toggleFavorite } from '../../../redux/features/favoritesSlice';
import { TransitionGroup } from 'react-transition-group';
import { useSelector, useDispatch } from 'react-redux';
import { Collapse } from '@mui/material';
import scss from './SidebarFavorites.module.scss';

const SidebarFavorites = () => {
  const dispatch = useDispatch();
  const favorites = useSelector((state) => state.favorites.items);
  const products = useSelector((state) => state.products.products);

  const favoriteProducts = useMemo(
    () =>
      favorites
        .map((favId) => products.find((product) => product._id === favId))
        .filter(Boolean)
        .reverse(),
    [favorites, products]
  );

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

export default memo(SidebarFavorites);
