import { useState } from "react";
import { MdOutlineFavoriteBorder, MdOutlineFavorite } from "react-icons/md";
import scss from './TitleFavorite.module.scss';

const TitleFavorite = ({ name, id, onFavoriteToggle, isFavorite }) => {
  const handleFavoriteToggle = () => {
    onFavoriteToggle(id);
  };

  return (
    <div className={scss.titleFavorite}>
      <h3>{name}</h3>
      {isFavorite ? (
        <MdOutlineFavorite className={`${scss.favoriteIcon} ${scss.favorite}`} onClick={handleFavoriteToggle} />
      ) : (
        <MdOutlineFavoriteBorder className={scss.favoriteIcon} onClick={handleFavoriteToggle} />
      )}
    </div>
  );
};

export default TitleFavorite;
