import { useState } from 'react';
import { MdOutlineFavoriteBorder, MdOutlineFavorite } from 'react-icons/md';
import { RiMessage3Line, RiSendPlaneLine } from 'react-icons/ri';
import { useNavigate } from 'react-router-dom';
import Tooltip from '@mui/material/Tooltip';
import CommentsModal from '../CommentsModal';
import ShareModal from '../ShareModal';
import scss from './TitleFavorite.module.scss';

const TitleFavorite = ({
  id,
  name,
  description,
  image,
  price,
  city,
  onFavoriteToggle,
  isFavorite,
  viewMode
}) => {
  const [isCommentsOpen, setCommentsOpen] = useState(false);
  const [isShareOpen, setShareOpen] = useState(false);
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

  const toggleShareModal = () => {
    setShareOpen(!isShareOpen);
  };

  const productUrl = `${window.location.origin}/product/${id}`;

  return (
    <div className={scss.titleFavorite}>
      <h3
        className={`${scss.title} ${viewMode === 'grid' ? scss.gridItem : scss.listItem}`}
        onClick={handleProductClick}
      >
        {name}
      </h3>
      <div className={scss.icons}>
        <Tooltip title="Поділитися" arrow>
          <div>
            <RiSendPlaneLine
              className={`${scss.icon} ${viewMode === 'grid' ? scss.gridItem : scss.listItem}`}
              onClick={toggleShareModal}
            />
          </div>
        </Tooltip>

        <Tooltip title="Коментарі" arrow>
          <div>
            <RiMessage3Line
              className={`${scss.icon} ${viewMode === 'grid' ? scss.gridItem : scss.listItem}`}
              onClick={toggleCommentsModal}
            />
          </div>
        </Tooltip>

        <Tooltip
          title={isFavorite ? 'Видалити з обраних' : 'Додати в обрані'}
          arrow
        >
          <div>
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
        </Tooltip>
      </div>
      {isCommentsOpen && (
        <CommentsModal
          show={isCommentsOpen}
          onToggle={toggleCommentsModal}
          productId={id}
        />
      )}
      <ShareModal
        show={isShareOpen}
        onToggle={toggleShareModal}
        name={name}
        productUrl={productUrl}
        price={price}
        city={city}
        description={description}
        image={image}
      />
    </div>
  );
};

export default TitleFavorite;
