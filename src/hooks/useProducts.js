import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchProducts,
  fetchExchangeRate
} from '../redux/features/productsSlice';

const useProducts = (currentPage) => {
  const dispatch = useDispatch();
  const { products, totalProducts } = useSelector((state) => state.products);

  const [loading, setLoading] = useState(true);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const response = await dispatch(
          fetchProducts({ page: currentPage, limit: 6 })
        ).unwrap();
        if (response.length === 0 || products.length >= totalProducts) {
          setHasMore(false);
        }
      } catch (error) {
        console.error('Failed to fetch products:', error);
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
    dispatch(fetchExchangeRate());
  }, [dispatch, currentPage, products.length, totalProducts]);

  return { products, loading, hasMore };
};

export default useProducts;
