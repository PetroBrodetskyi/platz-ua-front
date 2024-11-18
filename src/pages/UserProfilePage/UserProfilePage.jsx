import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import {
  fetchUserById,
  updateUserDetails
} from '../../redux/features/authSlice';
import {
  fetchUserProducts,
  fetchUsersPublicProducts
} from '../../redux/features/productsSlice';
import UserProfile from '../../components/UserProfile/UserProfile';
import ThemeSwitcher from '../../components/ThemeSwitcher/ThemeSwitcher';
import RandomCards from '../../components/RandomCards/RandomCards';
import scss from './UserProfilePage.module.scss';

const UserProfilePage = () => {
  const { userId } = useParams();
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.auth.user);
  const user = useSelector((state) => state.auth.owner);

  useEffect(() => {
    if (!userId) return;

    if (currentUser && currentUser._id === userId) {
      dispatch(fetchUserProducts());
    } else {
      dispatch(fetchUsersPublicProducts(userId));
    }

    dispatch(fetchUserById(userId));
  }, [dispatch, userId, currentUser]);

  const handleUpdate = (formData) => {
    const cleanedData = Object.fromEntries(
      Object.entries(formData).filter(([_, value]) => value !== '')
    );
    dispatch(updateUserDetails(cleanedData));
  };

  const shouldShowUserProfile = currentUser && currentUser._id === userId;

  return (
    <div>
      <div className={`${scss.userPage}`}>
        {shouldShowUserProfile && (
          <UserProfile user={user} onUpdate={handleUpdate} />
        )}

        <div className={scss.themeContainer}>
          <ThemeSwitcher />
        </div>
      </div>
      <div className={scss.random}>
        <h3 className={scss.title}>Вас можуть зацікавити</h3>
        <RandomCards />
      </div>
    </div>
  );
};

export default UserProfilePage;
