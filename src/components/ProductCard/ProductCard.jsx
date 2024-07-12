import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchProducts, fetchExchangeRate } from '../../redux/features/productsSlice';
import { toggleFavorite } from '../../redux/features/favoritesSlice';
import { useNavigate } from 'react-router-dom';
import TitleFavorite from './TitleFavorite/TitleFavorite';
import CartPrice from './CartPrice/CartPrice';
import scss from './ProductCard.module.scss';
import PlzCity from './PlzCity/PlzCity';
import CreateCondition from './CreateCondition/CreateCondition';

const ProductCard = () => {
  const dispatch = useDispatch();
  const { products, exchangeRate } = useSelector((state) => state.products);
  const favorites = useSelector((state) => state.favorites.items);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchProducts());
    dispatch(fetchExchangeRate());
  }, [dispatch]);

  const handleProductClick = (productId) => {
    navigate(`/product/${productId}`);
  };

  return (
    <ul className={scss.list}>
      {products.map((product) => (
        <li key={product._id} className={scss.productItem}>
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
                <p>{product.description}</p>
              </div>
              <div className={scss.dateCart}>
                <div>
                    <CreateCondition
                      addedDate={product.createdAt}
                      condition={product.condition}
                    />
                </div>
                <div>
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
      ))}
    </ul>
  );
};

export default ProductCard;
