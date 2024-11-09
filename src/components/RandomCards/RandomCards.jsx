import React, { useState, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
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
import TitleFavorite from '../ProductCard/TitleFavorite/TitleFavorite';
import CartPrice from '../ProductCard/CartPrice/CartPrice';
import CreateCondition from '../ProductCard/CreateCondition/CreateCondition';
import { useTheme } from '../../context/ThemeContext.jsx';
import Notification from '../Notification/Notification';
import scss from './RandomCards.module.scss';

const MemoizedTitleFavorite = React.memo(TitleFavorite);
const MemoizedCartPrice = React.memo(CartPrice);
const MemoizedCreateCondition = React.memo(CreateCondition);

const RandomCards = () => {
  const dispatch = useDispatch();
  const { products, exchangeRate } = useSelector((state) => state.products);
  const favorites = useSelector((state) => state.favorites.items);
  const cartItems = useSelector((state) => state.cart.items);
  const navigate = useNavigate();
  const [notification, setNotification] = useState('');
  const [owners, setOwners] = useState(() => {
    const savedOwners = localStorage.getItem('owners');
    return savedOwners ? JSON.parse(savedOwners) : {};
  });
  const [loadingOwners, setLoadingOwners] = useState({});
  const [randomProducts, setRandomProducts] = useState([]);

  useEffect(() => {
    dispatch(fetchProducts());
    dispatch(fetchExchangeRate());
  }, [dispatch]);

  const fetchOwner = useCallback(
    async (ownerId) => {
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
    },
    [dispatch, owners, loadingOwners]
  );

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
        owner: owners[product.owner] || {}
      };
      dispatch(addToCart(productWithOwner));
      setNotification(`${product.name} додано до кошика!`);
    }
  };

  useEffect(() => {
    const uniqueOwners = [...new Set(products.map((product) => product.owner))];
    uniqueOwners.forEach((ownerId) => fetchOwner(ownerId));
  }, [products, fetchOwner]);

  useEffect(() => {
    if (products.length > 0 && randomProducts.length === 0) {
      const shuffled = [...products]
        .sort(() => 0.5 - Math.random())
        .slice(0, 4);
      setRandomProducts(shuffled);
    }
  }, [products, randomProducts]);

  const { isDarkMode } = useTheme();

  return (
    <div className={scss.container}>
      <ul className={scss.list}>
        {randomProducts.map((product) => {
          const isInCart = cartItems.some((item) => item._id === product._id);
          const owner = owners[product.owner] || {};

          return (
            <li
              key={product._id}
              className={`${scss.productItem} ${product.isSquare ? 'square' : ''} ${isDarkMode ? scss.darkMode : ''}`}
            >
              <div className={scss.product}>
                <div className={scss.productImage}>
                  <div className={scss.ownerViews}>
                    {owner.name ? (
                      <div
                        className={scss.ownerContainer}
                        onClick={() => handleOwnerClick(owner._id)}
                      >
                        <img
                          src={owner.avatarURL}
                          alt={owner.name}
                          className={scss.avatar}
                        />
                        <div className={scss.name}>{owner.name}</div>
                      </div>
                    ) : (
                      <div className={scss.ownerContainer}>
                        <div className={scss.avatarPlaceholder}></div>
                        <div className={scss.namePlaceholder}></div>
                      </div>
                    )}
                    <div>
                      <div className={scss.viewsQuantity}>
                        <p>
                          {product.views !== undefined ? product.views : 'N/A'}
                        </p>
                        <HiOutlineEye />
                      </div>
                    </div>
                  </div>
                  <img
                    src={product.image1}
                    alt={product.name}
                    onClick={() => handleProductClick(product._id)}
                  />
                </div>
                <div className={scss.productInfo}>
                  <div>
                    <MemoizedTitleFavorite
                      name={product.name}
                      id={product._id}
                      onFavoriteToggle={() =>
                        dispatch(toggleFavorite(product._id))
                      }
                      isFavorite={favorites.includes(product._id)}
                    />
                    <p className={scss.description}>{product.description}</p>
                  </div>
                  <div className={scss.dateCart}>
                    <div>
                      <MemoizedCreateCondition
                        addedDate={product.createdAt}
                        condition={product.condition}
                      />
                    </div>
                    <div>
                      {exchangeRate !== null && (
                        <MemoizedCartPrice
                          price={product.price}
                          exchangeRate={exchangeRate}
                          onAddToCart={() => handleAddToCart(product, isInCart)}
                          isInCart={isInCart}
                        />
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </li>
          );
        })}
      </ul>
      {notification && (
        <Notification
          message={notification}
          onClose={() => setNotification('')}
        />
      )}
    </div>
  );
};

export default React.memo(RandomCards);
