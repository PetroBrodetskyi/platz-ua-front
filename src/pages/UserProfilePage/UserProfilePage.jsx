import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchUserById } from '../../redux/features/authSlice';
import { fetchUserProducts, fetchUsersPublicProducts } from '../../redux/features/productsSlice';
import UserProfile from '../../components/UserProfile/UserProfile';

import scss from './UserProfilePage.module.scss';

const UserProfilePage = () => {
  const { userId } = useParams();
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.auth.user);
  const user = useSelector((state) => state.auth.owner);

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
      {currentUser && currentUser._id === userId && (
        <UserProfile user={user} onUpdate={handleUpdate} />
      )}
    </div>
  );
};

export default UserProfilePage;