import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchUserById,
  selectFollowingUsers
} from '../../redux/features/authSlice';
import { Link } from 'react-router-dom';
import scss from './Following.module.scss';

const Following = () => {
  const dispatch = useDispatch();
  const followingUsers = useSelector(selectFollowingUsers);
  const currentUserId = useSelector((state) => state.auth.user?._id);

  useEffect(() => {
    if (currentUserId) {
      dispatch(fetchUserById(currentUserId));
    }
  }, [currentUserId, dispatch]);

  return (
    <div className={scss.following}>
      <div className={scss.userList}>
        {followingUsers.map((user) => (
          <div key={user._id} className={scss.userItem}>
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
        ))}
      </div>
    </div>
  );
};

export default Following;
