import { useNavigate } from "react-router-dom";
import scss from "./UserInfo.module.scss";

const UserInfo = ({ owner }) => {
  const navigate = useNavigate();

  if (!owner) {
    return <p>Користувач не знайдений</p>;
  }

  const handleOwnerClick = () => {
    navigate(`/user/${owner._id}`);
  };

  return (
    <div className={scss.userInfo} onClick={handleOwnerClick}>
      <img src={owner.avatarURL} alt={owner.name} className={scss.avatar} />
      <p className={scss.name}>{owner.name}</p>
    </div>
  );
};

export default UserInfo;
