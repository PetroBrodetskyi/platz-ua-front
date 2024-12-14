import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchUserById,
  selectFollowingUsers
} from '../../redux/features/authSlice';
import Tooltip from '@mui/material/Tooltip';
import { Link } from 'react-router-dom';
import { useTheme } from '../../context/ThemeContext';
import scss from './Following.module.scss';

const Following = () => {
  const dispatch = useDispatch();
  const followingUsers = useSelector(selectFollowingUsers);
  const currentUserId = useSelector((state) => state.auth.user?._id);
  const { isDarkMode } = useTheme();

  useEffect(() => {
    if (currentUserId) {
      dispatch(fetchUserById(currentUserId));
    }
  }, [currentUserId, dispatch]);

  return (
    <div className={`${scss.following} ${isDarkMode ? scss.darkMode : ''}`}>
      <div className={scss.userList}>
        {followingUsers.map((user) => (
          <Tooltip
            key={user._id}
            title="Перейти на сторінку автора"
            placement="bottom-start"
          >
            <div className={scss.userItem}>
              <Link to={`/user/${user._id}`}>
                <img
                  src={user.avatarURL}
                  alt={user.name}
                  className={scss.avatar}
                />
              </Link>
              <Link to={`/user/${user._id}`} className={scss.name}>
                {user.name.split(' ')[0]}
              </Link>
            </div>
          </Tooltip>
        ))}
      </div>
    </div>
  );
};

export default Following;
