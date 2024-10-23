import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import CartPrice from '../../ProductCard/CartPrice/CartPrice';
import { fetchExchangeRate } from '../../../redux/features/productsSlice';
import scss from './UserProductsDetails.module.scss';

const ProductDetails = ({ product, isInCart, handleAddToCart }) => {
  const dispatch = useDispatch();
  const exchangeRate = useSelector((state) => state.products.exchangeRate);

  useEffect(() => {
    if (!exchangeRate) {
      dispatch(fetchExchangeRate());
    }
  }, [dispatch, exchangeRate]);

  return (
    <div className={scss.productDetails}>
      <div className={scss.container}>
        <div className={scss.namePrice}>
          <h3 className={scss.title}>{product.name}</h3>
          <div>
            <CartPrice
              price={product.price}
              exchangeRate={exchangeRate}
              onAddToCart={handleAddToCart}
              isInCart={isInCart}
            />
          </div>
        </div>
        <div>
          <p className={scss.description}>{product.description}</p>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
