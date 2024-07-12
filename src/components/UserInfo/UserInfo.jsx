import { useSelector } from 'react-redux';
import scss from './UserInfo.module.scss';

const UserInfo = () => {
  const user = useSelector((state) => state.auth.user);

  if (!user) {
    return <p>Користувач не знайдений</p>;
  }

  return (
    <div className={scss.userInfo}>
      <img src={user.avatarURL} alt={user.name} className={scss.avatar} />
      <div className={scss.details}>
        <p className={scss.name}>Ім'я: {user.name}</p>
        <p className={scss.phone}>Телефон: {user.phone}</p>
      </div>
    </div>
  );
};

export default UserInfo;