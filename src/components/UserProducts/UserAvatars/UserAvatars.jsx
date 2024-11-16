import { AvatarGroup, Avatar, Typography, Skeleton } from '@mui/material';
import scss from './UserAvatars.module.scss';
import { useEffect, useState } from 'react';

const UserAvatars = ({ users, isLoading, onAvatarClick }) => {
  const [loading, setLoading] = useState(isLoading);

  useEffect(() => {
    setLoading(isLoading);
  }, [isLoading]);

  return (
    <div className={scss.avatarsContainer} onClick={onAvatarClick}>
      {loading ? (
        <AvatarGroup max={4} className={scss.avatars}>
          {[...Array(4)].map((_, index) => (
            <Skeleton key={index} variant="circular" width={50} height={50} />
          ))}
        </AvatarGroup>
      ) : (
        <>
          <Typography variant="body2" className={scss.userCount}>
            {users.length}
          </Typography>
          <AvatarGroup max={4} className={scss.avatars}>
            {users.map(({ _id, name, avatarURL, avatarPublicId }) => (
              <Avatar
                key={_id}
                alt={name}
                src={avatarURL || avatarPublicId}
                className={scss.avatar}
              />
            ))}
          </AvatarGroup>
        </>
      )}
    </div>
  );
};

export default UserAvatars;
