import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toggleFavorite } from '../../redux/features/favoritesSlice';
import { useNavigate } from 'react-router-dom';
import TitleFavorite from './TitleFavorite/TitleFavorite';
import CartPrice from './CartPrice/CartPrice';
import scss from './ProductCard.module.scss';
import PlzCity from './PlzCity/PlzCity';
import CreateCondition from './CreateCondition/CreateCondition';

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();
  const favorites = useSelector((state) => state.favorites.items);
  const { exchangeRate } = useSelector((state) => state.products);
  const navigate = useNavigate();

  const handleProductClick = (productId) => {
    navigate(`/product/${productId}`);
  };

  return (
    <li className={`${scss.productItem} ${product.isSquare ? 'square' : ''}`}>
      <div className={scss.product}>
        <div className={scss.productImage}>
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
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </li>
  );
};

export default ProductCard;
