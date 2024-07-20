import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchProducts } from '../../redux/features/productsSlice';
import ProductCard from '../ProductCard/ProductCard';
import scss from './ProductList.module.scss';

const ProductList = () => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products.products);
  const loading = useSelector((state) => state.products.loading);
  const error = useSelector((state) => state.products.error);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className={scss.productList}>
      <div className={scss.container}>
        <h2>Найновіші</h2>
        <ul>
          {products.map(product => (
            <ProductCard key={product._id} product={product} />
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ProductList;
