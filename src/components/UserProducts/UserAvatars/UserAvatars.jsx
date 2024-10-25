import { AvatarGroup, Avatar, Typography } from '@mui/material';
import scss from './UserAvatars.module.scss';

const UserAvatars = ({ users }) => {
  return (
    <div className={scss.avatarsContainer}>
      <Typography variant="body2" className={scss.userCount}>
        {users.length}
      </Typography>

      <AvatarGroup max={4}>
        {users.map(({ _id, name, avatarURL, avatarPublicId }) => (
          <Avatar key={_id} alt={name} src={avatarURL || avatarPublicId} />
        ))}
      </AvatarGroup>
    </div>
  );
};

export default UserAvatars;
