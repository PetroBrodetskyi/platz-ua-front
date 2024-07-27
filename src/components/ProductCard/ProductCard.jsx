import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts, fetchExchangeRate, fetchProductById } from '../../redux/features/productsSlice';
import { toggleFavorite } from '../../redux/features/favoritesSlice';
import { addToCart, removeFromCart } from '../../redux/features/cartSlice';
import { fetchUserById } from '../../redux/features/authSlice';
import { useNavigate } from 'react-router-dom';
import { HiOutlineEye } from "react-icons/hi";
import { FiChevronDown, FiChevronUp, FiX } from "react-icons/fi"; // Додано іконку FiX
import TitleFavorite from './TitleFavorite/TitleFavorite';
import CartPrice from './CartPrice/CartPrice';
import PlzCity from './PlzCity/PlzCity';
import CreateCondition from './CreateCondition/CreateCondition';
import Notification from '../Notification/Notification';
import Typography from '@mui/material/Typography';
import { getCategoryIcon, getSubcategoryIcon, getCategoryLabel, getSubcategoryLabel } from '../Categories/icons';
import scss from './ProductCard.module.scss';

const ProductCard = () => {
  const dispatch = useDispatch();
  const { products, exchangeRate } = useSelector((state) => state.products);
  const favorites = useSelector((state) => state.favorites.items);
  const cartItems = useSelector((state) => state.cart.items);
  const navigate = useNavigate();
  const [notification, setNotification] = useState('');
  const [showDescriptions, setShowDescriptions] = useState({});

  useEffect(() => {
    dispatch(fetchProducts());
    dispatch(fetchExchangeRate());
  }, [dispatch]);

  const handleProductClick = (productId) => {
    navigate(`/product/${productId}`);
    dispatch(fetchProductById(productId));
  };

  const handleAddToCart = (product, isInCart) => {
    if (isInCart) {
      dispatch(removeFromCart(product._id));
      setNotification(`${product.name} видалено з кошика!`);
    } else {
      dispatch(fetchUserById(product.owner)).then((ownerResponse) => {
        const productWithOwner = {
          ...product,
          owner: ownerResponse.payload,
        };
        dispatch(addToCart(productWithOwner));
        setNotification(`${product.name} додано до кошика!`);
      });
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

  return (
    <>
      <ul className={scss.list}>
        {products.map((product) => {
          const isInCart = cartItems.some((item) => item._id === product._id);

          return (
            <li key={product._id} className={`${scss.productItem} ${product.isSquare ? 'square' : ''}`}>
              <div className={scss.product}>
                <div className={scss.productImage}>
                  <div className={scss.categoryViews}>
                    <div className={scss.categoryInfo}>
                      <div className={scss.tooltipWrapper}>
                        {getCategoryIcon(product.category)}
                        <span className={scss.tooltip}>{getCategoryLabel(product.category)}</span>
                      </div>
                      {product.subcategory1 && (
                        <div className={scss.tooltipWrapper}>
                          {getSubcategoryIcon(product.subcategory1)}
                          <span className={scss.tooltip}>{getSubcategoryLabel(product.subcategory1)}</span>
                        </div>
                      )}
                      {product.subcategory2 && (
                        <div className={scss.tooltipWrapper}>
                          {getSubcategoryIcon(product.subcategory2)}
                          <span className={scss.tooltip}>{getSubcategoryLabel(product.subcategory2)}</span>
                        </div>
                      )}
                      {product.subcategory3 && (
                        <div className={scss.tooltipWrapper}>
                          {getSubcategoryIcon(product.subcategory3)}
                          <span className={scss.tooltip}>{getSubcategoryLabel(product.subcategory3)}</span>
                        </div>
                      )}
                    </div>
                    <div className={scss.viewsContainer}>
                      <p className={scss.viewsQuantity}>{product.views !== undefined ? product.views : 'N/A'}</p>
                      <div><HiOutlineEye /></div>
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
                    <TitleFavorite
                      name={product.name}
                      id={product._id}
                      onFavoriteToggle={() => dispatch(toggleFavorite(product._id))}
                      isFavorite={favorites.includes(product._id)}
                    />
                    <p className={scss.description}>{product.description}</p>
                  </div>
                  <div className={scss.dateCart}>
                    <div>
                      <CreateCondition
                        addedDate={product.createdAt}
                        condition={product.condition}
                      />
                    </div>
                    <div className={scss.expandButtonContainer}>
                      <button 
                        className={scss.expandButton} 
                        onClick={() => handleToggleDescription(product._id)}
                      >
                        {showDescriptions[product._id] ? <FiChevronUp className={scss.icon}/> : <FiChevronDown className={scss.icon}/>}
                      </button>
                    </div>
                    <div>
                      {exchangeRate !== null && (
                        <CartPrice 
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
              <div className={`${scss.productDescription} ${showDescriptions[product._id] ? scss.visible : scss.hidden}`}>
                <Typography paragraph style={{ fontSize: '14px' }}>{product.description}</Typography>
                <div className={scss.closeButtonContainer}>
                  <button 
                    className={scss.closeButton} 
                    onClick={() => handleCloseDescription(product._id)}
                  >
                    <FiX className={scss.icon} />
                  </button>
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
    </>
  );
};

export default ProductCard;
