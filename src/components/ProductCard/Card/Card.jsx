import React from 'react';
import { HiOutlineEye } from 'react-icons/hi';
import { IoChevronUpOutline } from 'react-icons/io5';
import { RiPlayList2Fill } from 'react-icons/ri';
import Skeleton from '@mui/material/Skeleton';
import Tooltip from '@mui/material/Tooltip';
import CreateCondition from '../CreateCondition';
import DescriptionModal from '../DescriptionModal';
import TitleFavorite from '../TitleFavorite';
import CartPrice from '../CartPrice';
import { useTheme } from '../../../context/ThemeContext.jsx';
import scss from './Card.module.scss';

const Card = ({
  product,
  ownerData,
  isInCart,
  favorites,
  showDescription,
  exchangeRate,
  onToggleDescription,
  onAddToCart,
  onFavoriteToggle,
  onProductClick,
  onOwnerClick,
  viewMode
}) => {
  const {
    _id,
    name,
    description,
    createdAt,
    condition,
    price,
    image1,
    views,
    PLZ,
    city
  } = product;

  const { isDarkMode } = useTheme();

  return (
    <li
      className={`${scss.productItem} ${viewMode === 'grid' ? scss.gridItem : scss.listItem} ${isDarkMode ? scss.darkMode : ''}`}
    >
      <div
        className={`${scss.product} ${viewMode === 'grid' ? scss.gridItem : scss.listItem}`}
      >
        <div
          className={`${scss.productImage} ${viewMode === 'grid' ? scss.gridItem : scss.listItem}`}
        >
          <div className={scss.ownerViews}>
            {ownerData ? (
              <div
                className={scss.ownerContainer}
                onClick={() => onOwnerClick(ownerData._id)}
              >
                <img
                  src={ownerData.avatarURL}
                  alt={ownerData.name}
                  className={`${scss.avatar} ${viewMode === 'grid' ? scss.gridItem : scss.listItem}`}
                  loading="lazy"
                />
                <div
                  className={`${scss.name} ${viewMode === 'grid' ? scss.gridItem : scss.listItem}`}
                >
                  {ownerData.name}
                </div>
              </div>
            ) : (
              <div className={scss.ownerContainer}>
                <Skeleton variant="circular" width={40} height={40} />
                <Skeleton variant="text" width={100} />
              </div>
            )}
            <div
              className={`${scss.viewsQuantity} ${viewMode === 'grid' ? scss.gridItem : scss.listItem}`}
            >
              <p>{views ?? 'N/A'}</p>
              <HiOutlineEye
                className={`${scss.icon} ${viewMode === 'grid' ? scss.gridItem : scss.listItem}`}
              />
            </div>
          </div>
          {image1 ? (
            <img
              src={image1}
              alt={name}
              onClick={() => onProductClick(_id)}
              loading="lazy"
              className={scss.image}
            />
          ) : (
            <Skeleton
              variant="rectangular"
              width="100%"
              height={118}
              animation="pulse"
            />
          )}
        </div>
        <div
          className={`${scss.productInfo} ${viewMode === 'grid' ? scss.gridItem : scss.listItem}`}
        >
          <div
            className={`${scss.titleDescription} ${viewMode === 'grid' ? scss.gridItem : scss.listItem}`}
          >
            {ownerData ? (
              <TitleFavorite
                name={name}
                price={price}
                description={description}
                image={image1}
                city={city}
                plz={PLZ}
                id={_id}
                onFavoriteToggle={onFavoriteToggle}
                isFavorite={favorites.includes(_id)}
              />
            ) : (
              <Skeleton variant="text" width={150} />
            )}
            <p
              className={`${scss.description} ${viewMode === 'grid' ? scss.gridItem : scss.listItem}`}
            >
              {description}
            </p>
          </div>
          <div className={scss.dateCart}>
            <div>
              {createdAt && (
                <CreateCondition addedDate={createdAt} condition={condition} />
              )}
            </div>
            <div
              className={`${scss.expandButtonContainer} ${viewMode === 'grid' ? scss.gridItem : scss.listItem}`}
            >
              <Tooltip
                title={showDescription ? 'Закрити' : 'Показати більше'}
                arrow
              >
                <button
                  className={scss.expandButton}
                  onClick={onToggleDescription}
                >
                  {showDescription ? (
                    <IoChevronUpOutline className={scss.icon} />
                  ) : (
                    <RiPlayList2Fill className={scss.icon} />
                  )}
                </button>
              </Tooltip>
            </div>
            <div>
              {exchangeRate !== null ? (
                <CartPrice
                  price={price}
                  exchangeRate={exchangeRate}
                  onAddToCart={onAddToCart}
                  isInCart={isInCart}
                />
              ) : (
                <Skeleton variant="text" width={80} />
              )}
            </div>
          </div>
          <DescriptionModal
            show={showDescription}
            name={name}
            description={description}
            image={image1}
            PLZ={PLZ}
            city={city}
            onToggle={onToggleDescription}
          />
        </div>
      </div>
    </li>
  );
};

export default Card;
