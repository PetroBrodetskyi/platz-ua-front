import React, { useState, useEffect } from 'react';
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

import Notification from '../Notification/Notification';
import TitleFavorite from './TitleFavorite/TitleFavorite';
import CartPrice from './CartPrice/CartPrice';
import CreateCondition from './CreateCondition/CreateCondition';

const ProductCard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { products, exchangeRate, totalProducts } = useSelector((state) => state.products);
  const favorites = useSelector((state) => state.favorites.items);
  const cartItems = useSelector((state) => state.cart.items);

  const [notification, setNotification] = useState('');
  const [endOfListNotification, setEndOfListNotification] = useState(false);
  const [showDescriptions, setShowDescriptions] = useState({});
  const [owners, setOwners] = useState(() => JSON.parse(localStorage.getItem('owners')) || {});
  const [loadingOwners, setLoadingOwners] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const response = await dispatch(fetchProducts({ page: currentPage, limit: 8 })).unwrap();
        if (response.length === 0 || products.length >= totalProducts) {
          setHasMore(false);
          setEndOfListNotification(true);
        }
      } catch (error) {
        console.error('Failed to fetch products:', error);
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
      if (owner) fetchOwner(owner);
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
    setNotification(`${product.name} ${isInCart ? 'видалено з кошика' : 'додано до кошика'}!`);
  };

  const handleToggleDescription = (productId) => {
    setShowDescriptions((prev) => ({ ...prev, [productId]: !prev[productId] }));
  };

  const fetchMoreProducts = () => setCurrentPage((prevPage) => prevPage + 1);

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
              const { _id, name, description, createdAt, condition, price, image1, owner, views, PLZ, city } = product;
              const isInCart = cartItems.some((item) => item._id === _id);
              const ownerData = owners[owner];

              return (
                <motion.li
                  key={_id}
                  className={`${scss.productItem} ${product.isSquare ? 'square' : ''}`}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className={scss.product}>
                    <div className={scss.productImage}>
                      <div className={scss.ownerViews}>
                        {ownerData ? (
                          <div className={scss.ownerContainer} onClick={() => handleOwnerClick(ownerData._id)}>
                            <img src={ownerData.avatarURL} alt={ownerData.name} className={scss.avatar} loading="lazy" />
                            <div className={scss.name}>{ownerData.name}</div>
                          </div>
                        ) : (
                          <div className={scss.ownerContainer}>
                            <Skeleton variant="circular" width={40} height={40} />
                            <Skeleton variant="text" width={100} />
                          </div>
                        )}
                        <div className={scss.viewsQuantity}>
                          <p>{views ?? 'N/A'}</p>
                          <HiOutlineEye />
                        </div>
                      </div>
                      {image1 ? (
                        <img src={image1} alt={name} onClick={() => handleProductClick(_id)} loading="lazy" />
                      ) : (
                        <Skeleton variant="rectangular" width={210} height={118} />
                      )}
                    </div>
                    <div className={scss.productInfo}>
                      <div>
                        {ownerData ? (
                          <TitleFavorite
                            name={name}
                            id={_id}
                            onFavoriteToggle={() => dispatch(toggleFavorite(_id))}
                            isFavorite={favorites.includes(_id)}
                          />
                        ) : (
                          <Skeleton variant="text" width={150} />
                        )}
                        <p className={scss.description}>{description}</p>
                      </div>
                      <div className={scss.dateCart}>
                        <div>
                          {createdAt && <CreateCondition addedDate={createdAt} condition={condition} />}
                        </div>
                        <div className={scss.expandButtonContainer}>
                          <button className={scss.expandButton} onClick={() => handleToggleDescription(_id)}>
                            {showDescriptions[_id] ? <IoChevronUpOutline className={scss.icon} /> : <RiPlayList2Fill className={scss.icon} />}
                          </button>
                        </div>
                        <div>
                          {exchangeRate !== null ? (
                            <CartPrice price={price} exchangeRate={exchangeRate} onAddToCart={() => handleAddToCart(product, isInCart)} isInCart={isInCart} />
                          ) : (
                            <Skeleton variant="text" width={80} />
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                  <AnimatePresence>
                    {showDescriptions[_id] && (
                      <motion.div
                        className={`${scss.productDescription} ${scss.visible}`}
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <div className={scss.paragraphContainer}>
                          <div>
                            <p className={scss.desc}>{description}</p>
                          </div>
                          <div className={scss.locationContainer}>
                            <div className={scss.locationItem}>
                              <TbLocation />
                              <p>{PLZ}</p>
                            </div>
                            <button onClick={() => handleToggleDescription(_id)}>
                              <FiX className={scss.icon} />
                            </button>
                            <div className={scss.locationItem}>
                              <SlLocationPin />
                              <p>{city}</p>
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
      {notification && <Notification message={notification} onClose={() => setNotification('')} />}
      {endOfListNotification && <Notification message="Ви подивилися всі оголошення" onClose={() => setEndOfListNotification(false)} />}
    </>
  );
};

export default React.memo(ProductCard);
