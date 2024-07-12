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
        <p className={scss.phone}>
          Телефон: <a href={`tel:${owner.phone}`}>{owner.phone}</a>
        </p>
      </div>
    </div>
  );
};

export default UserInfo;
