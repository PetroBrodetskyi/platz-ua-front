import scss from './UserInfo.module.scss';

const UserInfo = ({ owner }) => {
  if (!owner) {
    return <p>Користувач не знайдений</p>;
  }

  return (
    <div className={scss.userInfo}>
        <img src={owner.avatarURL} alt={owner.name} className={scss.avatar} />
        <p className={scss.name}>{owner.name}</p>
    </div>
  );
};

export default UserInfo;
