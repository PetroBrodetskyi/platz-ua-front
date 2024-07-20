import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserProducts } from '../../redux/features/productsSlice';
import scss from './UserProducts.module.scss';

const UserProducts = ({ userId }) => {
  const dispatch = useDispatch();
  const { userProducts, loading, error } = useSelector((state) => state.products);

  useEffect(() => {
    if (userId) {
      dispatch(fetchUserProducts(userId));
    }
  }, [dispatch, userId]);

  if (loading) {
    return <p>Завантаження оголошень...</p>;
  }

  if (error) {
    return <p>Помилка: {error}</p>;
  }

  return (
    <div className={scss.userProducts}>
      <h2>Ваші оголошення</h2>
      <ul>
        {userProducts.map((product) => (
          <li className={scss.productsContainer} key={product._id}>
            <img src={product.image1} alt={product.name} />
            <div className={scss.productDetails}>
              <h3>{product.name}</h3>
              <p>{product.description}</p>
              <p className={scss.price}>{product.price} грн</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserProducts;
