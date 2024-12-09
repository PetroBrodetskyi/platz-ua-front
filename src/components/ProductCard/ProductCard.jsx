import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import InfiniteScroll from 'react-infinite-scroll-component';
import {
  fetchProducts,
  fetchExchangeRate
} from '../../redux/features/productsSlice';
import { toggleFavorite } from '../../redux/features/favoritesSlice';
import { handleAddToCart, renderSkeletons } from './variables';
import { useNavigate } from 'react-router-dom';
import Notification from '../Notification/Notification';
import Card from './Card';
import useOwners from '../../hooks/useOwners';
import scss from './ProductCard.module.scss';

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
  const [currentPage, setCurrentPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(true);

  const owners = useOwners(products);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const response = await dispatch(
          fetchProducts({ page: currentPage, limit: 6 })
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

  const handleProductClick = (productId) => {
    navigate(`/product/${productId}`);
  };

  const handleOwnerClick = (ownerId) => {
    if (ownerId) navigate(`/user/${ownerId}`);
  };

  const handleToggleDescription = (productId) => {
    setShowDescriptions((prev) => ({ ...prev, [productId]: !prev[productId] }));
  };

  const fetchMoreProducts = () => setCurrentPage((prevPage) => prevPage + 1);

  const approvedProducts = products.filter(
    (product) => product.status === 'approved' || product.status === 'vip'
  );

  return (
    <>
      <InfiniteScroll
        dataLength={approvedProducts.length}
        next={fetchMoreProducts}
        hasMore={hasMore}
        endMessage={null}
      >
        <ul className={`${scss.list} ${scss[viewMode]}`}>
          {loading
            ? renderSkeletons(6, viewMode)
            : approvedProducts.map((product) => {
                const isInCart = cartItems.some(
                  (item) => item._id === product._id
                );
                const ownerData = owners[product.owner];

                return (
                  <Card
                    key={product._id}
                    product={product}
                    ownerData={ownerData}
                    isInCart={isInCart}
                    favorites={favorites}
                    showDescription={showDescriptions[product._id]}
                    exchangeRate={exchangeRate}
                    onToggleDescription={() =>
                      handleToggleDescription(product._id)
                    }
                    onAddToCart={() =>
                      handleAddToCart(
                        product,
                        isInCart,
                        owners,
                        cartItems,
                        dispatch,
                        setNotification
                      )
                    }
                    onFavoriteToggle={() =>
                      dispatch(toggleFavorite(product._id))
                    }
                    onProductClick={handleProductClick}
                    onOwnerClick={handleOwnerClick}
                    viewMode={viewMode}
                  />
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
          message="Це всі оголошення"
          onClose={() => setEndOfListNotification(false)}
        />
      )}
    </>
  );
};

export default ProductCard;
