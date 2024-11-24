import scss from './OwnerInfo.module.scss';

const OwnerInfo = ({ owner }) => {
  return (
    <div className={scss.ownerInfo}>
      <h4>Інформація про власника</h4>
      {owner.avatarURL ? (
        <img
          src={owner.avatarURL}
          alt={`Аватар ${owner.name}`}
          className={scss.avatar}
        />
      ) : (
        <div className={scss.defaultAvatar}>Без аватара</div>
      )}
      <p>Ім'я: {owner.name}</p>
      <p>Email: {owner.email}</p>
      <p>Телефон: {owner.phone}</p>
      <p>id: {owner._id}</p>
      <p>plz: {owner.plz}</p>
      <p>city: {owner.city}</p>
      <p>Підписка: {owner.subscription}</p>
    </div>
  );
};

export default OwnerInfo;
