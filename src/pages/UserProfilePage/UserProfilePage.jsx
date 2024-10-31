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
import { Switch } from '@mui/material';
import { ImSun } from 'react-icons/im';
import { BsMoon } from 'react-icons/bs';
import { useTheme } from '../../context/ThemeContext.jsx';
import scss from './UserProfilePage.module.scss';

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

      <div className={scss.themeContainer}>
        <h3>Змінити тему</h3>
        <div className={scss.themeToggle}>
          <ImSun className={scss.icon} onClick={toggleTheme} />
          <Switch
            checked={isDarkMode}
            onChange={toggleTheme}
            color="primary"
            inputProps={{ 'aria-label': 'theme switcher' }}
          />
          <BsMoon className={scss.icon} onClick={toggleTheme} />
        </div>
      </div>
    </div>
  );
};

export default UserProfilePage;
