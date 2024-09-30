import { AiOutlineUser } from 'react-icons/ai';
import { useNavigate, useParams } from 'react-router-dom';
import scss from './ProfileButton.module.scss';

const ProfileButton = () => {
  const navigate = useNavigate();
  const { userId } = useParams();

  const navigateToProfile = () => {
    navigate(`/user-profile/${userId}`);
  };

  return (
    <button className={scss.profileButton} onClick={navigateToProfile}>
      <AiOutlineUser className={scss.icon} />
    </button>
  );
};

export default ProfileButton;
