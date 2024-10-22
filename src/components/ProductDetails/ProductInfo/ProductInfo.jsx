import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import scss from './ProductInfo.module.scss';
import CartPrice from '../../ProductCard/CartPrice/CartPrice';
import { fetchExchangeRate } from '../../../redux/features/productsSlice';

const ProductInfo = ({ product, handleAddToCart, isInCart }) => {
  const dispatch = useDispatch();
  const exchangeRate = useSelector((state) => state.products.exchangeRate);

  useEffect(() => {
    if (!exchangeRate) {
      dispatch(fetchExchangeRate());
    }
  }, [dispatch, exchangeRate]);

  return (
    <div className={scss.details}>
      <div className={scss.info}>
        <div className={scss.namePrice}>
          <h2 className={scss.title}>{product.name}</h2>
          <div className={scss.priceContainer}>
            <CartPrice
              price={product.price}
              exchangeRate={exchangeRate}
              onAddToCart={handleAddToCart}
              isInCart={isInCart}
            />
          </div>
        </div>
        <p className={scss.description}>{product.description}</p>
      </div>
    </div>
  );
};

export default ProductInfo;
