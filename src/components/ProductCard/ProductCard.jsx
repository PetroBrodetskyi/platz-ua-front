import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { fetchProducts, fetchExchangeRate } from '../../redux/features/productsSlice';
import { toggleFavorite } from '../../redux/features/favoritesSlice';
import TitleFavorite from './TitleFavorite/TitleFavorite';
import CartPrice from './CartPrice/CartPrice';
import scss from './ProductCard.module.scss';
import PlzCity from './PlzCity/PlzCity';

const ProductCard = () => {
  const dispatch = useDispatch();
  const { products, exchangeRate } = useSelector((state) => state.products);
  const favorites = useSelector((state) => state.favorites.items);

  useEffect(() => {
    dispatch(fetchProducts());
    dispatch(fetchExchangeRate());
  }, [dispatch]);

  return (
    <ul className={scss.list}>
      {products.map((product) => (
        <li key={product._id} className={scss.productItem}>
          <div className={scss.product}>
            <div className={scss.productImage}>
              <img
                src={product.image1}
                alt={product.name}
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
              <div>
                <PlzCity
                  plz={product.PLZ}
                  city={product.city}
                />
              </div>
              <div>
                {exchangeRate !== null && (
                  <CartPrice 
                    
                    condition={product.condition}
                    price={product.price} 
                    addedDate={product.createdAt} 
                    exchangeRate={exchangeRate} 
                  />
                )}
              </div>
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default ProductCard;
