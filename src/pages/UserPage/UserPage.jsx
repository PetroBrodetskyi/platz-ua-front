import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchUserById, updateUserDetails } from '../../redux/features/authSlice';
import UserProfile from '../../components/UserProfile/UserProfile';
import UserProducts from '../../components/UserProducts/UserProducts';
import scss from './UserPage.module.scss';
import AddProductForm from '../../components/AddProductForm/AddProductForm';

const UserPage = () => {
  const { userId } = useParams();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.owner);
  const currentUser = useSelector((state) => state.auth.user);

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
            {/* Відображення форми додавання оголошення тільки для власника сторінки */}
            {currentUser && currentUser._id === user._id && <AddProductForm />}
          </div>
        </div>
      ) : (
        <p>Завантаження даних...</p>
      )}
    </div>
  );
};

export default UserPage;
