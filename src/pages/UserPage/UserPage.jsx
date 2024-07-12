import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserById, updateUserDetails } from '../../redux/features/authSlice';
import UserProfile from '../../components/UserProfile/UserProfile';
import scss from './UserPage.module.scss';

const UserPage = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const userId = user ? user._id : null;

  useEffect(() => {
    if (userId) {
      console.log('Fetching user with ID:', userId);
      dispatch(fetchUserById(userId));
    }
  }, [dispatch, userId]);

  const handleUpdate = (formData) => {
    dispatch(updateUserDetails(formData));
  };

  return (
    <div className={scss.userPage}>
      <h1>Профіль користувача</h1>
      {user ? (
        <UserProfile user={user} onUpdate={handleUpdate} />
      ) : (
        <p>Завантаження даних...</p>
      )}
    </div>
  );
};

export default UserPage;