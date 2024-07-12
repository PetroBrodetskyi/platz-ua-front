import { MdOutlineFavoriteBorder, MdOutlineFavorite } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';

import scss from './TitleFavorite.module.scss';

const TitleFavorite = ({ name, id, onFavoriteToggle, isFavorite }) => {
  const navigate = useNavigate();
  
  const handleFavoriteToggle = () => {
    onFavoriteToggle(id);
  };

  const handleProductClick = () => {
    navigate(`/product/${id}`);
  };

  return (
    <div className={scss.titleFavorite}>
      <h3 className={scss.title} onClick={handleProductClick}>{name}</h3>
      {isFavorite ? (
        <MdOutlineFavorite
          className={`${scss.favoriteIcon} ${scss.favorite}`}
          onClick={handleFavoriteToggle}
        />
      ) : (
        <MdOutlineFavoriteBorder
          className={scss.favoriteIcon}
          onClick={handleFavoriteToggle}
        />
      )}
    </div>
  );
};

export default TitleFavorite;
