import { useNavigate } from 'react-router-dom';
import Tooltip from '@mui/material/Tooltip';
import scss from './UserInfo.module.scss';

const UserInfo = ({ owner }) => {
  const navigate = useNavigate();

  if (!owner) {
    return <p>Користувач не знайдений</p>;
  }

  const handleOwnerClick = () => {
    navigate(`/user/${owner._id}`);
  };

  const handleScrollTo = (id) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className={scss.menu}>
      <div className={scss.userInfo} onClick={handleOwnerClick}>
        <img src={owner.avatarURL} alt={owner.name} className={scss.avatar} />
        <Tooltip title="Перейти на сторінку автора" placement="bottom-start">
          <p className={scss.name}>{owner.name}</p>
        </Tooltip>
      </div>
      <div className={scss.navigation}>
        <button
          className={scss.navigate}
          onClick={() => handleScrollTo('comments-section')}
        >
          <p>Коментарі</p>
        </button>
        <button
          className={scss.navigate}
          onClick={() => handleScrollTo('location-section')}
        >
          <p>Локація</p>
        </button>
      </div>
    </div>
  );
};

export default UserInfo;
