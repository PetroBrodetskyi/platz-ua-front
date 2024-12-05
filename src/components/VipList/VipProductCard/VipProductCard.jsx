import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserById } from '../../../redux/features/authSlice';
import { useNavigate } from 'react-router-dom';
import Skeleton from '@mui/material/Skeleton';
import Notification from '../../Notification';
import Card from './Card';
import axiosInstance from '../../../redux/axiosConfig';
import { fetchProductById } from '../../../redux/features/productsSlice';
import { toggleFavorite } from '../../../redux/features/favoritesSlice';
import {
  addToCartBack,
  removeFromCartBack,
  fetchProductsInCart,
  setCartItems
} from '../../../redux/features/cartSlice';
import scss from './VipProductCard.module.scss';

const VipProductCard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { exchangeRate } = useSelector((state) => state.products);
  const favorites = useSelector((state) => state.favorites.items);
  const cartItems = useSelector((state) => state.cart.items);

  const [products, setProducts] = useState([]);
  const [notification, setNotification] = useState('');
  const [showDescriptions, setShowDescriptions] = useState({});
  const [owners, setOwners] = useState(
    JSON.parse(localStorage.getItem('owners')) || {}
  );
  const [loadingOwners, setLoadingOwners] = useState({});
  const [loading, setLoading] = useState(true);

  const fetchProducts = async () => {
    try {
      const response = await axiosInstance.get('/products/public/?all=true');
      setProducts(response.data);
    } catch (error) {
      console.error('Failed to load products:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    const fetchOwner = async (ownerId) => {
      if (!owners[ownerId] && !loadingOwners[ownerId]) {
        setLoadingOwners((prev) => ({ ...prev, [ownerId]: true }));
        try {
          const ownerData = await dispatch(fetchUserById(ownerId)).unwrap();
          setOwners((prev) => {
            const updatedOwners = { ...prev, [ownerId]: ownerData };
            localStorage.setItem('owners', JSON.stringify(updatedOwners));
            return updatedOwners;
          });
        } catch (error) {
          console.error('Failed to fetch owner data:', error);
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
    try {
      if (isInCart) {
        await dispatch(removeFromCartBack(product._id));
      } else {
        await dispatch(addToCartBack(productWithOwner));
      }
      await dispatch(fetchProductsInCart());
      const updatedCartItems = isInCart
        ? cartItems.filter((item) => item._id !== product._id)
        : [...cartItems, productWithOwner];
      localStorage.setItem('cart', JSON.stringify(updatedCartItems));
      dispatch(setCartItems(updatedCartItems));

      setNotification(
        `${product.name} ${isInCart ? 'видалено з кошика' : 'додано до кошика'}!`
      );
    } catch (error) {
      console.error('Failed to update cart:', error);
    }
  };

  const renderSkeletons = (count) =>
    Array.from({ length: count }, (_, index) => (
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

export default VipProductCard;
