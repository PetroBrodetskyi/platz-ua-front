import { useNavigate } from 'react-router-dom';
import scss from './Followers.module.scss';
import SubmitButton from '../SubmitButton';

const FollowingList = ({
  following,
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
        {following.map((followed) => {
          const isFollowing = followingIds.includes(followed._id);

          return (
            <li key={followed._id} className={scss.item}>
              <div className={scss.user}>
                <img
                  src={followed.avatarURL || avatarPublicId}
                  alt={`${followed.name}'s avatar`}
                  className={scss.avatar}
                  onClick={() => handleUserClick(followed._id)}
                />
                <div>
                  <h4
                    className={scss.name}
                    onClick={() => handleUserClick(followed._id)}
                  >
                    {followed.name}
                  </h4>
                  <p className={scss.city}>
                    {followed.city || followed.plz
                      ? `${followed.city || ''}, ${followed.plz || ''}`
                      : 'Немає даних'}
                  </p>
                </div>
              </div>
              {followed._id !== currentUserId && (
                <SubmitButton
                  buttonText={isFollowing ? 'Відстежується' : 'Стежити'}
                  onClick={() => handleFollowClick(followed._id)}
                />
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default FollowingList;
