import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchProducts,
  fetchExchangeRate
} from '../../redux/features/productsSlice';
import { toggleFavorite } from '../../redux/features/favoritesSlice';
import { handleAddToCart, renderSkeletons } from '../ProductCard/variables';
import { useNavigate } from 'react-router-dom';
import Notification from '../Notification/Notification';
import Card from '../ProductCard/Card';
import useOwners from '../../hooks/useOwners';
import scss from '../ProductCard/ProductCard.module.scss';

const FilterProductCard = ({ viewMode }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { products, exchangeRate } = useSelector((state) => state.products);
  const favorites = useSelector((state) => state.favorites.items);
  const cartItems = useSelector((state) => state.cart.items);

  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [notification, setNotification] = useState('');
  const [showDescriptions, setShowDescriptions] = useState({});

  const owners = useOwners(products);

  useEffect(() => {
    dispatch(fetchExchangeRate());
  }, [dispatch]);

  const loadProducts = async () => {
    setLoading(true);

    try {
      const response = await dispatch(
        fetchProducts({ page: currentPage, limit: 6 })
      ).unwrap();
    } catch (error) {
      console.error('Failed to load products:', error);
      setNotification('Помилка завантаження продуктів');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProducts();
  }, [currentPage]);

  const handleProductClick = (productId) => {
    navigate(`/product/${productId}`);
  };

  const handleOwnerClick = (ownerId) => {
    if (ownerId) navigate(`/user/${ownerId}`);
  };

  const handleToggleDescription = (productId) => {
    setShowDescriptions((prev) => ({ ...prev, [productId]: !prev[productId] }));
  };

  const approvedProducts = products.filter(
    (product) => product.status === 'approved' || product.status === 'vip'
  );

  return (
    <>
      {/* Основний список продуктів */}
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
                  onFavoriteToggle={() => dispatch(toggleFavorite(product._id))}
                  onProductClick={handleProductClick}
                  onOwnerClick={handleOwnerClick}
                  viewMode={viewMode}
                />
              );
            })}
      </ul>
      {notification && (
        <Notification
          message={notification}
          onClose={() => setNotification('')}
        />
      )}
    </>
  );
};

export default FilterProductCard;
