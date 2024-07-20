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

  if (loading) return <p>Завантаження оголошень...</p>;

  if (error) return <p>Помилка: {error}</p>;

  return (
    <div className={scss.userProducts}>
      <h2>Ваші активні оголошення</h2>
      <ul className={scss.productsList}>
        {userProducts.map((product) => (
          <li className={scss.productsItem} key={product._id}>
            <div className={scss.image}>
              <img src={product.image1} alt={product.name} />
              <img src={product.image2} alt={product.name} />
              <img src={product.image3} alt={product.name} />
              <img src={product.image4} alt={product.name} />
            </div>
            <div className={scss.productDetails}>
              <div className={scss.namePrice}>
                <h3>{product.name}</h3>
                <p className={scss.price}>€{product.price}</p>
              </div>
              <p className={scss.description}>{product.description}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserProducts;
