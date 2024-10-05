import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import InfiniteScroll from 'react-infinite-scroll-component';
import {
  fetchProducts,
  fetchExchangeRate,
  fetchProductById
} from '../../redux/features/productsSlice';
import { fetchUserById } from '../../redux/features/authSlice';
import { toggleFavorite } from '../../redux/features/favoritesSlice';
import { addToCart, removeFromCart } from '../../redux/features/cartSlice';
import { useNavigate } from 'react-router-dom';
import { HiOutlineEye } from 'react-icons/hi';
import { IoChevronUpOutline } from 'react-icons/io5';
import { RiPlayList2Fill } from 'react-icons/ri';
import Skeleton from '@mui/material/Skeleton';
import Notification from '../Notification/Notification';
import TitleFavorite from './TitleFavorite/TitleFavorite';
import CartPrice from './CartPrice/CartPrice';
import CreateCondition from './CreateCondition/CreateCondition';
// import Loader from '../Loader/Loader';
import ProductDescription from './ProductDescription/ProductDescription';
import scss from './ProductCard.module.scss';
import GalleryCard from '../ProductCard/GalleryCard/GalleryCard';

const ProductCard = ({ viewMode }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { products, exchangeRate, totalProducts } = useSelector(
    (state) => state.products
  );
  const favorites = useSelector((state) => state.favorites.items);
  const cartItems = useSelector((state) => state.cart.items);

  const [notification, setNotification] = useState('');
  const [endOfListNotification, setEndOfListNotification] = useState(false);
  const [showDescriptions, setShowDescriptions] = useState({});
  const [owners, setOwners] = useState(
    () => JSON.parse(localStorage.getItem('owners')) || {}
  );
  const [loadingOwners, setLoadingOwners] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const response = await dispatch(
          fetchProducts({ page: currentPage, limit: 4 })
        ).unwrap();
        if (response.length === 0 || products.length >= totalProducts) {
          setHasMore(false);
          setEndOfListNotification(true);
        }
      } catch (error) {
        console.error('Failed to fetch products:', error);
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
    dispatch(fetchExchangeRate());
  }, [dispatch, currentPage, products.length, totalProducts]);

  useEffect(() => {
    const fetchOwner = async (ownerId) => {
      if (!owners[ownerId] && !loadingOwners[ownerId]) {
        setLoadingOwners((prev) => ({ ...prev, [ownerId]: true }));
        try {
          const response = await dispatch(fetchUserById(ownerId)).unwrap();
          setOwners((prev) => {
            const newOwners = { ...prev, [ownerId]: response };
            localStorage.setItem('owners', JSON.stringify(newOwners));
            return newOwners;
          });
        } catch (error) {
          console.error('Failed to fetch owner:', error);
        } finally {
          setLoadingOwners((prev) => ({ ...prev, [ownerId]: false }));
        }
      }
    };

    products.forEach(({ owner }) => {
      if (owner && !owners[owner]) {
        fetchOwner(owner);
      }
    });
  }, [products, owners, loadingOwners, dispatch]);

  const handleProductClick = (productId) => {
    navigate(`/product/${productId}`);
    dispatch(fetchProductById(productId));
  };

  const handleOwnerClick = (ownerId) => {
    if (ownerId) {
      navigate(`/user/${ownerId}`);
    }
  };

  const handleAddToCart = (product, isInCart) => {
    const productWithOwner = { ...product, owner: owners[product.owner] };
    if (isInCart) {
      dispatch(removeFromCart(product._id));
    } else {
      dispatch(addToCart(productWithOwner));
    }
    setNotification(
      `${product.name} ${isInCart ? 'видалено з кошика' : 'додано до кошика'}!`
    );
  };

  const handleToggleDescription = (productId) => {
    setShowDescriptions((prev) => ({ ...prev, [productId]: !prev[productId] }));
  };

  const fetchMoreProducts = () => setCurrentPage((prevPage) => prevPage + 1);

  const renderSkeletons = (count) => {
    return Array.from({ length: count }).map((_, index) => (
      <li key={index}>
        <div>
          <Skeleton
            variant="rectangular"
            animation="pulse"
            className={`${scss.skelet} ${viewMode === 'grid' ? scss.gridItem : scss.listItem}`}
          />
          <div>
            <Skeleton variant="text" width="100%" animation="pulse" />
            <Skeleton variant="text" width="80%" animation="pulse" />
            <Skeleton variant="text" width="60%" animation="pulse" />
            <Skeleton variant="text" width="100%" animation="pulse" />
          </div>
        </div>
      </li>
    ));
  };

  return (
    <>
      <InfiniteScroll
        dataLength={products.length}
        next={fetchMoreProducts}
        hasMore={hasMore}
        endMessage={null}
      >
        <ul className={`${scss.list} ${scss[viewMode]}`}>
          {loading
            ? renderSkeletons(6)
            : products.map((product) => {
                const {
                  _id,
                  name,
                  description,
                  createdAt,
                  condition,
                  price,
                  image1,
                  owner,
                  views,
                  PLZ,
                  city
                } = product;
                const isInCart = cartItems.some((item) => item._id === _id);
                const ownerData = owners[owner];

                return (
                  <li
                    key={_id}
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
                              onClick={() => handleOwnerClick(ownerData._id)}
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
                              <Skeleton
                                variant="circular"
                                width={40}
                                height={40}
                              />
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
                        {/* {image1 ? (
                          <img
                            src={image1}
                            alt={name}
                            onClick={() => handleProductClick(_id)}
                            loading="lazy"
                            className={scss.image}
                          />
                        ) : loading ? (
                          <Skeleton
                            variant="rectangular"
                            width="100%"
                            height={118}
                            animation="pulse"
                          />
                        ) : null} */}
                        <GalleryCard images={product} />
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
                              onFavoriteToggle={() =>
                                dispatch(toggleFavorite(_id))
                              }
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
                              <CreateCondition
                                addedDate={createdAt}
                                condition={condition}
                              />
                            )}
                          </div>
                          <div
                            className={`${scss.expandButtonContainer} ${viewMode === 'grid' ? scss.gridItem : scss.listItem}`}
                          >
                            <button
                              className={scss.expandButton}
                              onClick={() => handleToggleDescription(_id)}
                            >
                              {showDescriptions[_id] ? (
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
                                onAddToCart={() =>
                                  handleAddToCart(product, isInCart)
                                }
                                isInCart={isInCart}
                              />
                            ) : (
                              <Skeleton variant="text" width={80} />
                            )}
                          </div>
                        </div>
                        <ProductDescription
                          show={showDescriptions[_id]}
                          name={name}
                          description={description}
                          PLZ={PLZ}
                          city={city}
                          onToggle={() => handleToggleDescription(_id)}
                        />
                      </div>
                    </div>
                  </li>
                );
              })}
        </ul>
      </InfiniteScroll>
      {notification && (
        <Notification
          message={notification}
          onClose={() => setNotification('')}
        />
      )}
      {endOfListNotification && (
        <Notification
          message="Ви подивилися всі оголошення"
          onClose={() => setEndOfListNotification(false)}
        />
      )}
    </>
  );
};

export default ProductCard;
