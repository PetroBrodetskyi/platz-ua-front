import React, { useState, useEffect, useCallback, Suspense } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import InfiniteScroll from 'react-infinite-scroll-component';
import { fetchProducts, fetchExchangeRate, fetchProductById } from '../../redux/features/productsSlice';
import { fetchUserById } from '../../redux/features/authSlice';
import { toggleFavorite } from '../../redux/features/favoritesSlice';
import { addToCart, removeFromCart } from '../../redux/features/cartSlice';
import { useNavigate } from 'react-router-dom';
import { HiOutlineEye } from 'react-icons/hi';
import { TbLocation } from 'react-icons/tb';
import { IoChevronUpOutline } from 'react-icons/io5';
import { RiPlayList2Fill } from 'react-icons/ri';
import { SlLocationPin } from 'react-icons/sl';
import { FiX } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';
import Skeleton from '@mui/material/Skeleton';
import scss from './ProductCard.module.scss';

const TitleFavorite = React.lazy(() => import('./TitleFavorite/TitleFavorite'));
const CartPrice = React.lazy(() => import('./CartPrice/CartPrice'));
const CreateCondition = React.lazy(() => import('./CreateCondition/CreateCondition'));
const Notification = React.lazy(() => import('../Notification/Notification'));

const ProductCard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { products, exchangeRate, totalProducts } = useSelector((state) => state.products);
  const favorites = useSelector((state) => state.favorites.items);
  const cartItems = useSelector((state) => state.cart.items);

  const [notification, setNotification] = useState('');
  const [endOfListNotification, setEndOfListNotification] = useState(false);
  const [showDescriptions, setShowDescriptions] = useState({});
  const [owners, setOwners] = useState(() => {
    const savedOwners = localStorage.getItem('owners');
    return savedOwners ? JSON.parse(savedOwners) : {};
  });
  const [loadingOwners, setLoadingOwners] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    dispatch(fetchProducts({ page: currentPage, limit: 8 })).then((response) => {
      if (response.payload.length === 0 || products.length >= totalProducts) {
        setHasMore(false);
        setEndOfListNotification(true);
      }
    });
    dispatch(fetchExchangeRate());
  }, [dispatch, currentPage]);

  const fetchOwner = useCallback(async (ownerId) => {
    if (!owners[ownerId] && !loadingOwners[ownerId]) {
      setLoadingOwners((prev) => ({ ...prev, [ownerId]: true }));
      const response = await dispatch(fetchUserById(ownerId));
      setOwners((prev) => {
        const newOwners = { ...prev, [ownerId]: response.payload };
        localStorage.setItem('owners', JSON.stringify(newOwners));
        return newOwners;
      });
      setLoadingOwners((prev) => ({ ...prev, [ownerId]: false }));
    }
  }, [dispatch, owners, loadingOwners]);

  useEffect(() => {
    products.forEach((product) => {
      if (product.owner) {
        fetchOwner(product.owner);
      }
    });
  }, [products, fetchOwner]);

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
    if (isInCart) {
      dispatch(removeFromCart(product._id));
      setNotification(`${product.name} видалено з кошика!`);
    } else {
      const productWithOwner = {
        ...product,
        owner: owners[product.owner],
      };
      dispatch(addToCart(productWithOwner));
      setNotification(`${product.name} додано до кошика!`);
    }
  };

  const handleToggleDescription = (productId) => {
    setShowDescriptions((prev) => ({
      ...prev,
      [productId]: !prev[productId],
    }));
  };

  const handleCloseDescription = (productId) => {
    setShowDescriptions((prev) => ({
      ...prev,
      [productId]: false,
    }));
  };

  const fetchMoreProducts = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  return (
    <>
      <InfiniteScroll
        dataLength={products.length}
        next={fetchMoreProducts}
        hasMore={hasMore}
        endMessage={null}
      >
        <ul className={scss.list}>
          <AnimatePresence>
            {products.map((product) => {
              const isInCart = cartItems.some((item) => item._id === product._id);
              const owner = owners[product.owner];

              return (
                <motion.li
                  key={product._id}
                  className={`${scss.productItem} ${product.isSquare ? 'square' : ''}`}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                >
                  <Suspense
                    fallback={
                      <Skeleton variant="rectangular" width="100%" height={280} />
                    }
                  >
                    <div className={scss.product}>
                      <div className={scss.productImage}>
                        <div className={scss.ownerViews}>
                          {owner ? (
                            <div className={scss.ownerContainer} onClick={() => handleOwnerClick(owner._id)}>
                              <img src={owner.avatarURL} alt={owner.name} className={scss.avatar} loading="lazy" />
                              <div className={scss.name}>{owner.name}</div>
                            </div>
                          ) : (
                            <div className={scss.ownerContainer}>
                              <Skeleton variant="circular" width={40} height={40} />
                              <Skeleton variant="text" width={100} />
                            </div>
                          )}
                          <div>
                            <div className={scss.viewsQuantity}>
                              <p>{product.views !== undefined ? product.views : 'N/A'}</p>
                              <HiOutlineEye />
                            </div>
                          </div>
                        </div>
                        {product.image1 ? (
                          <img
                            src={product.image1}
                            alt={product.name}
                            onClick={() => handleProductClick(product._id)}
                            loading="lazy"
                          />
                        ) : (
                          <Skeleton variant="rectangular" width={210} height={118} />
                        )}
                      </div>
                      <div className={scss.productInfo}>
                        <div>
                          {owner ? (
                            <TitleFavorite
                              name={product.name}
                              id={product._id}
                              onFavoriteToggle={() => dispatch(toggleFavorite(product._id))}
                              isFavorite={favorites.includes(product._id)}
                            />
                          ) : (
                            <Skeleton variant="text" width={150} />
                          )}
                          <p className={scss.description}>{product.description}</p>
                        </div>
                        <div className={scss.dateCart}>
                          <div>
                            {product.createdAt && (
                              <CreateCondition
                                addedDate={product.createdAt}
                                condition={product.condition}
                              />
                            )}
                          </div>
                          <div className={scss.expandButtonContainer}>
                            <button
                              className={scss.expandButton}
                              onClick={() => handleToggleDescription(product._id)}
                            >
                              {showDescriptions[product._id] ? <IoChevronUpOutline className={scss.icon} /> : <RiPlayList2Fill className={scss.icon} />}
                            </button>
                          </div>
                          <div>
                            {exchangeRate !== null ? (
                              <CartPrice
                                price={product.price}
                                exchangeRate={exchangeRate}
                                onAddToCart={() => handleAddToCart(product, isInCart)}
                                isInCart={isInCart}
                              />
                            ) : (
                              <Skeleton variant="text" width={80} />
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </Suspense>
                  <AnimatePresence>
                    {showDescriptions[product._id] && (
                      <motion.div
                        className={`${scss.productDescription} ${scss.visible}`}
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <div>
                          <div className={scss.paragraphContainer}>
                            <div>
                              <p className={scss.desc}>{product.description}</p>
                            </div>
                            <div className={scss.locationContainer}>
                              <div className={scss.locationItem}>
                                <TbLocation />
                                <p>{product.PLZ}</p>
                              </div>
                              <button onClick={() => handleCloseDescription(product._id)}>
                                <FiX className={scss.icon} />
                              </button>
                              <div className={scss.locationItem}>
                                <SlLocationPin />
                                <p>{product.city}</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.li>
              );
            })}
          </AnimatePresence>
        </ul>
      </InfiniteScroll>
      <Suspense fallback={<Skeleton variant="rectangular" width="100%" height={50} />}>
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
      </Suspense>
    </>
  );
};

export default React.memo(ProductCard);
