import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchProducts, fetchExchangeRate } from '../../redux/features/productsSlice';
import { fetchUserById } from '../../redux/features/authSlice';
import scss from './ProductDetails.module.scss';
import ProductsGallery from './ProductsGallery/ProductsGallery';
import ProductInfo from './ProductInfo/ProductInfo';
import UserInfo from './UserInfo/UserInfo';

const ProductDetails = () => {
  const { productId } = useParams();
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products.products);
  const exchangeRate = useSelector((state) => state.products.exchangeRate);
  const product = products.find((product) => product._id === productId);
  const owner = useSelector((state) => state.auth.owner);

  useEffect(() => {
    if (!products.length) {
      dispatch(fetchProducts());
      dispatch(fetchExchangeRate());
    }
  }, [dispatch, products.length]);

  useEffect(() => {
    if (product && product.owner) {
      console.log("Fetching user with id:", product.owner);
      dispatch(fetchUserById(product.owner));
    }
  }, [dispatch, product]);

  if (!product) {
    return <p>Продукт не знайдено</p>;
  }

  return (
    <div className={scss.productDetails}>
      <ProductsGallery images={{ image1: product.image1, image2: product.image2, image3: product.image3, image4: product.image4 }} />
      <div className={scss.userProduct}>
        <ProductInfo product={product} exchangeRate={exchangeRate} />
        <UserInfo owner={owner} />
      </div>
    </div>
  );
};

export default ProductDetails;
