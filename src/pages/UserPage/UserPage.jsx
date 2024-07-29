import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchUserById, updateUserDetails } from '../../redux/features/authSlice';
import { fetchUserProducts, fetchUsersPublicProducts } from '../../redux/features/productsSlice';
import UserProfile from '../../components/UserProfile/UserProfile';
import UserProducts from '../../components/UserProducts/UserProducts';
import scss from './UserPage.module.scss';
import AddProductForm from '../../components/AddProductForm/AddProductForm';

const UserPage = () => {
  const { userId } = useParams();
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

  const handleUpdate = (formData) => {
    dispatch(updateUserDetails(formData));
  };

  return (
    <div className={scss.userPage}>
      {user ? (
        <div className={scss.productsProfileContainer}>
          {currentUser && currentUser._id === user._id && <UserProfile user={user} />}
          <div>
            <UserProducts products={userProducts} />
          </div>
          <div>
            {currentUser && currentUser._id === userId && <AddProductForm />}
          </div>
        </div>
      ) : (
        <p>Завантаження даних...</p>
      )}
    </div>
  );
};

export default UserPage;
