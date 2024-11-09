import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserById } from '../../redux/features/authSlice';
import scss from './Following.module.scss';

const FollowingList = () => {
  const dispatch = useDispatch();
  const followingUsers = useSelector(
    (state) => state.auth.owner?.following || []
  );
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
            <img src={user.avatarURL} alt={user.name} className={scss.avatar} />
            <p className={scss.name}>{user.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FollowingList;
