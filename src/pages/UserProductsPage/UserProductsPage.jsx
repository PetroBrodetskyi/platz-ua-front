import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchUserById } from '../../redux/features/authSlice';
import { fetchUserProducts, fetchUsersPublicProducts } from '../../redux/features/productsSlice';
import UserProducts from '../../components/UserProducts/UserProducts';
import CreateAdButton from '../../components/CreateAdButton/CreateAdButton';
import ProfileButton from '../../components/ProfileButton/ProfileButton';
import scss from './UserProductsPage.module.scss';

const UserProductsPage = () => {
  const { userId } = useParams();
  const [products, setProducts] = useState([]);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.owner);
  const currentUser = useSelector((state) => state.auth.user);
  const userProducts = useSelector((state) => state.products.userProducts);

  useEffect(() => {
    if (userId) {
      if (currentUser && currentUser._id === userId) {
        dispatch(fetchUserProducts());
      } else {
        dispatch(fetchUsersPublicProducts(userId));
      }
      dispatch(fetchUserById(userId));
    }
  }, [dispatch, userId, currentUser]);

  useEffect(() => {
    setProducts(userProducts);
  }, [userProducts]);

  return (
    <div className={scss.userPage}>
      {user ? (
        <div className={scss.productsProfileContainer}>
          <UserProducts products={products} setProducts={setProducts} />
        </div>
      ) : (
        <p>Завантаження даних...</p>
      )}
      <ProfileButton />
      <CreateAdButton />
    </div>
  );
};

export default UserProductsPage;
