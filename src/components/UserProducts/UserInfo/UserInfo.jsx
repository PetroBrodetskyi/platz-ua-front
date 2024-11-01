import { useNavigate } from 'react-router-dom';
import { useCallback } from 'react';
import {
  FaFacebook,
  FaInstagram,
  FaLinkedin,
  FaTelegram,
  FaGlobe
} from 'react-icons/fa';
import UserAvatars from '../../UserProducts/UserAvatars';
import SubmitButton from '../../SubmitButton';
import scss from '../UserProducts.module.scss';

const UserInfo = ({
  owner,
  followingData,
  followersData,
  isFollowing,
  handleFollowClick,
  formattedDate
}) => {
  const navigate = useNavigate();

  const handleFollowersClick = useCallback(() => {
    navigate(`/follow`, { state: { tab: 'followers' } });
  }, [navigate]);

  const handleFollowingClick = useCallback(() => {
    navigate(`/follow`, { state: { tab: 'following' } });
  }, [navigate]);

  const handleMessagesClick = useCallback(() => {
    navigate('/messages', { state: { targetUserId: owner._id } });
    console.log(owner._id);
  }, [navigate, owner._id]);

  return (
    <div className={scss.container}>
      <img src={owner.avatarURL} alt="User Avatar" className={scss.avatar} />

      <div className={`${scss.followContainer} ${scss.mobileFollowContainer}`}>
        <div className={scss.followers} onClick={handleFollowersClick}>
          <h4>Стежить:</h4>
          <UserAvatars users={followingData} />
        </div>
        <div className={scss.followers} onClick={handleFollowingClick}>
          <h4>Читачі:</h4>
          <UserAvatars users={followersData} />
        </div>
      </div>

      <div>
        <h3 className={scss.userName}>{owner.name}</h3>
        {owner.plz || owner.city ? (
          <p>{`${owner.plz || ''} ${owner.city || ''}`.trim()}</p>
        ) : null}
      </div>

      <div className={scss.buttons}>
        {isFollowing !== null && (
          <SubmitButton
            buttonText={isFollowing ? 'Відстежується' : 'Стежити'}
            onClick={handleFollowClick}
          />
        )}
        <SubmitButton
          buttonText="Повідомлення"
          onClick={handleMessagesClick}
          type="button"
        />
      </div>

      <p className={scss.about}>{owner.about}</p>

      <div className={scss.socialLinks}>
        {owner.facebook && (
          <a
            href={owner.facebook}
            target="_blank"
            rel="noopener noreferrer"
            className={scss.userLink}
          >
            <FaFacebook className={scss.icon} /> Facebook
          </a>
        )}
        {owner.instagram && (
          <a
            href={owner.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className={scss.userLink}
          >
            <FaInstagram className={scss.icon} /> Instagram
          </a>
        )}
        {owner.linkedin && (
          <a
            href={owner.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className={scss.userLink}
          >
            <FaLinkedin className={scss.icon} /> Linkedin
          </a>
        )}
        {owner.telegram && (
          <a
            href={owner.telegram}
            target="_blank"
            rel="noopener noreferrer"
            className={scss.userLink}
          >
            <FaTelegram className={scss.icon} /> Telegram
          </a>
        )}
        {owner.site && (
          <a
            href={owner.site}
            target="_blank"
            rel="noopener noreferrer"
            className={scss.userLink}
          >
            <FaGlobe className={scss.icon} /> Website
          </a>
        )}
        <p>На сайті з {formattedDate}</p>
      </div>
    </div>
  );
};

export default UserInfo;
