import React from 'react';
import { HiOutlineEye } from 'react-icons/hi';
import { IoChevronUpOutline } from 'react-icons/io5';
import { RiPlayList2Fill } from 'react-icons/ri';
import Skeleton from '@mui/material/Skeleton';
import CreateCondition from '../CreateCondition';
import ProductDescription from '../ProductDescription';
import TitleFavorite from '../TitleFavorite';
import CartPrice from '../CartPrice';
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

  return (
    <li
      className={`${scss.productItem} ${viewMode === 'grid' ? scss.gridItem : scss.listItem}`}
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
          <div>
            {ownerData ? (
              <TitleFavorite
                name={name}
                price={price}
                description={description}
                image={image1}
                city={city}
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
          <ProductDescription
            show={showDescription}
            name={name}
            description={description}
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
