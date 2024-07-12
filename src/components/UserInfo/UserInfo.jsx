import scss from './UserInfo.module.scss';

const UserInfo = ({ owner }) => {
  if (!owner) {
    return <p>Користувач не знайдений</p>;
  }

  return (
    <div className={scss.userInfo}>
      <img src={owner.avatarURL} alt={owner.name} className={scss.avatar} />
      <div className={scss.details}>
        <p className={scss.name}>Ім'я: {owner.name}</p>
        <p className={scss.phone}>Телефон: {owner.phone}</p>
      </div>
    </div>
  );
};

export default UserInfo;