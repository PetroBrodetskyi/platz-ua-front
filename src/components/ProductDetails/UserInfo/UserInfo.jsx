import { useNavigate } from 'react-router-dom';
import Tooltip from '@mui/material/Tooltip';
import { useTheme } from '../../../context/ThemeContext';
import scss from './UserInfo.module.scss';

const UserInfo = ({ owner }) => {
  const navigate = useNavigate();
  const { isDarkMode } = useTheme();

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
          <h3 className={scss.name}>{owner.name}</h3>
        </Tooltip>
      </div>
      <div className={scss.navigation}>
        <button
          className={`${scss.navigate} ${isDarkMode ? scss.darkMode : ''}`}
          onClick={() => handleScrollTo('comments-section')}
        >
          <p>Коментарі</p>
        </button>
        <button
          className={`${scss.navigate} ${isDarkMode ? scss.darkMode : ''}`}
          onClick={() => handleScrollTo('location-section')}
        >
          <p>Локація</p>
        </button>
      </div>
    </div>
  );
};

export default UserInfo;
