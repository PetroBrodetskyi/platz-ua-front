import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import CreateCondition from '../ProductCard/CreateCondition/CreateCondition';
import { fetchProducts, fetchExchangeRate } from '../../redux/features/productsSlice';
import scss from './ProductDetails.module.scss';
import CartPrice from '../ProductCard/CartPrice/CartPrice';

const ProductDetails = () => {
  const { productId } = useParams();
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products.products);
  const exchangeRate = useSelector((state) => state.products.exchangeRate);
  const product = products.find((product) => product._id === productId);

  useEffect(() => {
    if (!products.length) {
      dispatch(fetchProducts());
      dispatch(fetchExchangeRate());
    }
  }, [dispatch, products.length]);

  if (!product) {
    return <p>Продукт не знайдено</p>;
  }

  return (
    <div className={scss.productDetails}>
      <div className={scss.images}>
        {product.image1 && <img src={product.image1} alt={product.name} />}
        {product.image2 && <img src={product.image2} alt={product.name} />}
        {product.image3 && <img src={product.image3} alt={product.name} />}
      </div>
      <div className={scss.details}>
        <div className={scss.namePrice}>
          <h2>{product.name}</h2>
          {exchangeRate !== null && (
            <div className={scss.priceContainer}>
              <CartPrice price={product.price} exchangeRate={exchangeRate} />
            </div>
          )}
        </div>
        <p>{product.description}</p>
        <CreateCondition addedDate={product.createdAt} condition={product.condition} />
        <p>PLZ: {product.PLZ}</p>
        <p>Місто: {product.city}</p>
      </div>
    </div>
  );
};

export default ProductDetails;