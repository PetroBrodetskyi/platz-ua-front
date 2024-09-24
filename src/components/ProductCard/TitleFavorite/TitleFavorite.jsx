import { useState } from 'react';
import { MdOutlineFavoriteBorder, MdOutlineFavorite } from 'react-icons/md';
import { RiMessage3Line, RiSendPlaneLine } from 'react-icons/ri';
import { useNavigate } from 'react-router-dom';
import CommentsModal from '../CommentsModal/CommentsModal';

import scss from './TitleFavorite.module.scss';

const TitleFavorite = ({ name, id, onFavoriteToggle, isFavorite, viewMode }) => {
  const [isCommentsOpen, setCommentsOpen] = useState(false);
  const navigate = useNavigate();

  const handleFavoriteToggle = () => {
    onFavoriteToggle(id);
  };

  const handleProductClick = () => {
    navigate(`/product/${id}`);
  };

  const toggleCommentsModal = () => {
    setCommentsOpen(!isCommentsOpen);
  };

  return (
    <div className={scss.titleFavorite}>
      <h3 className={`${scss.title} ${viewMode === 'grid' ? scss.gridItem : scss.listItem}`}
        onClick={handleProductClick}>{name}</h3>
      <div className={scss.icons}>
        <RiSendPlaneLine className={`${scss.icon} ${viewMode === 'grid' ? scss.gridItem : scss.listItem}`} />
        <RiMessage3Line 
          className={`${scss.icon} ${viewMode === 'grid' ? scss.gridItem : scss.listItem}`} 
          onClick={toggleCommentsModal}
        />
        {isFavorite ? (
          <MdOutlineFavorite
            className={`${scss.icon} ${viewMode === 'grid' ? scss.gridItem : scss.listItem} ${scss.favorite}`}
            onClick={handleFavoriteToggle}
          />
        ) : (
          <MdOutlineFavoriteBorder
            className={`${scss.icon} ${viewMode === 'grid' ? scss.gridItem : scss.listItem}`}
            onClick={handleFavoriteToggle}
          />
        )}
      </div>
      {isCommentsOpen && (
        <CommentsModal 
          show={isCommentsOpen} 
          onToggle={toggleCommentsModal} 
          productId={id}
        />
      )}
    </div>
  );
};

export default TitleFavorite;
