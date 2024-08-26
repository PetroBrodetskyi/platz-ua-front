import { MdOutlineFavoriteBorder, MdOutlineFavorite } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';

import scss from './TitleFavorite.module.scss';

const TitleFavorite = ({ name, id, onFavoriteToggle, isFavorite, viewMode }) => {
  const navigate = useNavigate();
  
  const handleFavoriteToggle = () => {
    onFavoriteToggle(id);
  };

  const handleProductClick = () => {
    navigate(`/product/${id}`);
  };

  return (
    <div className={scss.titleFavorite}>
      <h3 className={`${scss.title} ${viewMode === 'grid' ? scss.gridItem : scss.listItem}`} onClick={handleProductClick}>{name}</h3>
      {isFavorite ? (
        <MdOutlineFavorite
          className={`${scss.favoriteIcon} ${viewMode === 'grid' ? scss.gridItem : scss.listItem} ${scss.favorite}`}
          onClick={handleFavoriteToggle}
        />
      ) : (
        <MdOutlineFavoriteBorder
          className={`${scss.favoriteIcon} ${viewMode === 'grid' ? scss.gridItem : scss.listItem}`}
          onClick={handleFavoriteToggle}
        />
      )}
    </div>
  );
};

export default TitleFavorite;
