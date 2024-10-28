import scss from './Followers.module.scss';

const FollowersList = ({ followers }) => {
  return (
    <div className={scss.list}>
      <h3>Читачі</h3>
      <ul>
        {followers.map((follower) => (
          <li key={follower.id} className={scss.item}>
            {follower.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FollowersList;
