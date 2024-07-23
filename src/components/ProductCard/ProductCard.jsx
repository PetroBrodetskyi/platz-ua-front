import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchProducts, fetchExchangeRate, fetchProductById } from '../../redux/features/productsSlice';
import { toggleFavorite } from '../../redux/features/favoritesSlice';
import { addToCart, removeFromCart } from '../../redux/features/cartSlice';
import { fetchUserById } from '../../redux/features/authSlice';
import { useNavigate } from 'react-router-dom';
import TitleFavorite from './TitleFavorite/TitleFavorite';
import CartPrice from './CartPrice/CartPrice';
import PlzCity from './PlzCity/PlzCity';
import CreateCondition from './CreateCondition/CreateCondition';
import { getCategoryIcon, getSubcategoryIcon, getCategoryLabel, getSubcategoryLabel } from '../Categories/icons';
import Notification from '../Notification/Notification';
import scss from './ProductCard.module.scss';

const ProductCard = () => {
  const dispatch = useDispatch();
  const { products, exchangeRate } = useSelector((state) => state.products);
  const favorites = useSelector((state) => state.favorites.items);
  const cartItems = useSelector((state) => state.cart.items);
  const navigate = useNavigate();
  const [notification, setNotification] = useState('');

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

  return (
    <>
      <ul className={scss.list}>
        {products.map((product) => {
          const isInCart = cartItems.some((item) => item._id === product._id);

          return (
            <li key={product._id} className={`${scss.productItem} ${product.isSquare ? 'square' : ''}`}>
              <div className={scss.product}>
                <div className={scss.productImage}>
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
                        addedDate={product.updatedAt}
                        condition={product.condition}
                      />
                    </div>
                    <div className={scss.plzCity}>
                      <PlzCity
                        plz={product.PLZ}
                        city={product.city}
                      />
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
