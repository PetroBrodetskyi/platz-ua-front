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
import scss from './UserProfilePage.module.scss';
import { useTheme } from '../../context/ThemeContext.jsx';

const UserProfilePage = () => {
  const { userId } = useParams();
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.auth.user);
  const user = useSelector((state) => state.auth.owner);

  const { isDarkMode, toggleTheme } = useTheme();

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
    <div className={`${scss.userPage} ${isDarkMode ? 'darkMode' : ''}`}>
      {shouldShowUserProfile && (
        <UserProfile user={user} onUpdate={handleUpdate} />
      )}
      <button onClick={toggleTheme}>Перемикання теми</button>
    </div>
  );
};

export default UserProfilePage;
