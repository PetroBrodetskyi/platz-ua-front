import { useNavigate } from 'react-router-dom';
import scss from './Followers.module.scss';
import SubmitButton from '../SubmitButton';

const FollowersList = ({
  followers,
  currentUserId,
  handleFollowClick,
  followingIds
}) => {
  const navigate = useNavigate();

  const handleUserClick = (userId) => {
    navigate(`/user/${userId}`);
  };

  return (
    <div className={scss.list}>
      <ul className={scss.listContainer}>
        {followers.map((follower) => {
          const isFollowing = followingIds.includes(follower._id);

          return (
            <li key={follower._id} className={scss.item}>
              <div className={scss.user}>
                <img
                  src={follower.avatarURL || avatarPublicId}
                  alt={`${follower.name}'s avatar`}
                  className={scss.avatar}
                  onClick={() => handleUserClick(follower._id)}
                />
                <div>
                  <h4
                    className={scss.name}
                    onClick={() => handleUserClick(follower._id)}
                  >
                    {follower.name}
                  </h4>
                  <p className={scss.city}>
                    {follower.city || follower.plz
                      ? `${follower.city || ''}, ${follower.plz || ''}`
                      : 'Немає даних'}
                  </p>
                </div>
              </div>
              {follower._id !== currentUserId && (
                <SubmitButton
                  buttonText={isFollowing ? 'Відстежується' : 'Стежити'}
                  onClick={() => handleFollowClick(follower._id)}
                />
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default FollowersList;
