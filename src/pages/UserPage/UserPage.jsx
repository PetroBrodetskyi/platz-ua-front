import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserById, updateUserDetails } from '../../redux/features/authSlice';
import UserProfile from '../../components/UserProfile/UserProfile';
import UserProducts from '../../components/UserProducts/UserProducts';
import scss from './UserPage.module.scss';
import AddProductForm from '../../components/AddProductForm/AddProductForm';

const UserPage = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const userId = user ? user._id : null;

  useEffect(() => {
    if (userId) {
      dispatch(fetchUserById(userId));
    }
  }, [dispatch, userId]);

  const handleUpdate = (formData) => {
    dispatch(updateUserDetails(formData));
  };

  return (
    <div className={scss.userPage}>
      {user ? (
        <div className={scss.productsProfileContainer}>
          <div>
            <UserProducts userId={user._id} />
          </div>
          <div>
            <AddProductForm />
            {/* <UserProfile user={user} onUpdate={handleUpdate} /> */}
          </div>
        </div>
      ) : (
        <p>Завантаження даних...</p>
      )}
    </div>
  );
};

export default UserPage;
