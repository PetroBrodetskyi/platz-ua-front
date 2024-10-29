import { useNavigate } from 'react-router-dom';
import scss from './Followers.module.scss';
import SubmitButton from '../SubmitButton';

const FollowingList = ({ following, handleFollowClick }) => {
  const navigate = useNavigate();

  const handleUserClick = (userId) => {
    navigate(`/user/${userId}`);
  };

  return (
    <div className={scss.list}>
      <h3>Стежить</h3>
      <ul>
        {following.map((followed) => {
          const isFollowing = true;
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
                    {followed.plz} {followed.city}
                  </p>
                </div>
              </div>
              <SubmitButton
                buttonText={isFollowing ? 'Відстежується' : 'Стежити'}
                onClick={() => handleFollowClick(followed._id)}
              />
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default FollowingList;
