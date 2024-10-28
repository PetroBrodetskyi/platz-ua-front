import scss from './Followers.module.scss';

const FollowingList = ({ following }) => {
  return (
    <div className={scss.list}>
      <h3>Стежить</h3>
      <ul>
        {following.map((followed) => (
          <li key={followed.id} className={scss.item}>
            {followed.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FollowingList;
