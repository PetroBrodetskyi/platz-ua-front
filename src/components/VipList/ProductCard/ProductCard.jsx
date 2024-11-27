import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchProducts,
  fetchExchangeRate,
  fetchProductById
} from '../../../redux/features/productsSlice';
import { fetchUserById } from '../../../redux/features/authSlice';
import { toggleFavorite } from '../../../redux/features/favoritesSlice';
import {
  addToCartBack,
  removeFromCartBack,
  fetchProductsInCart,
  setCartItems
} from '../../../redux/features/cartSlice';
import { useNavigate } from 'react-router-dom';
import Skeleton from '@mui/material/Skeleton';
import Notification from '../../Notification';
import Card from './Card';
import scss from './ProductCard.module.scss';

const ProductCard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { products, exchangeRate } = useSelector((state) => state.products);
  const favorites = useSelector((state) => state.favorites.items);
  const cartItems = useSelector((state) => state.cart.items);

  const [notification, setNotification] = useState('');
  const [showDescriptions, setShowDescriptions] = useState({});
  const [owners, setOwners] = useState(
    () => JSON.parse(localStorage.getItem('owners')) || {}
  );
  const [loadingOwners, setLoadingOwners] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        await dispatch(fetchProducts()).unwrap();
        dispatch(fetchExchangeRate());
      } catch (error) {
        console.error('Failed to fetch products:', error);
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, [dispatch]);

  useEffect(() => {
    const fetchOwner = async (ownerId) => {
      if (!owners[ownerId] && !loadingOwners[ownerId]) {
        setLoadingOwners((prev) => ({ ...prev, [ownerId]: true }));
        try {
          const response = await dispatch(fetchUserById(ownerId)).unwrap();
          setOwners((prev) => {
            const updatedOwners = { ...prev, [ownerId]: response };
            localStorage.setItem('owners', JSON.stringify(updatedOwners));
            return updatedOwners;
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
    if (ownerId) navigate(`/user/${ownerId}`);
  };

  const handleToggleDescription = (productId) => {
    setShowDescriptions((prev) => ({ ...prev, [productId]: !prev[productId] }));
  };

  const handleAddToCart = async (product, isInCart) => {
    const productWithOwner = { ...product, owner: owners[product.owner] };
    if (isInCart) {
      await dispatch(removeFromCartBack(product._id));
      dispatch(fetchProductsInCart());
      const updatedCartItems = cartItems.filter(
        (item) => item._id !== product._id
      );
      localStorage.setItem('cart', JSON.stringify(updatedCartItems));
      dispatch(setCartItems(updatedCartItems));
    } else {
      await dispatch(addToCartBack(product));
      dispatch(fetchProductsInCart());
      const updatedCartItems = [...cartItems, product];
      localStorage.setItem('cart', JSON.stringify(updatedCartItems));
      dispatch(setCartItems(updatedCartItems));
    }
    setNotification(
      `${product.name} ${isInCart ? 'видалено з кошика' : 'додано до кошика'}!`
    );
  };

  const renderSkeletons = (count) => {
    return Array.from({ length: count }).map((_, index) => (
      <li key={index}>
        <Skeleton
          variant="rectangular"
          animation="pulse"
          className={scss.skelet}
        />
        <div>
          <Skeleton variant="text" width="100%" animation="pulse" />
          <Skeleton variant="text" width="80%" animation="pulse" />
          <Skeleton variant="text" width="60%" animation="pulse" />
          <Skeleton variant="text" width="100%" animation="pulse" />
        </div>
      </li>
    ));
  };

  const approvedProducts = products.filter(
    (product) => product.status === 'vip'
  );

  return (
    <>
      <ul className={scss.list}>
        {loading
          ? renderSkeletons(6)
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
                  onAddToCart={() => handleAddToCart(product, isInCart)}
                  onFavoriteToggle={() => dispatch(toggleFavorite(product._id))}
                  onProductClick={handleProductClick}
                  onOwnerClick={handleOwnerClick}
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

export default ProductCard;
