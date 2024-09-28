import { AiOutlineLogout } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../../redux/features/authSlice";
import scss from "./Logout.module.scss";

const Logout = ({ onLogout }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await dispatch(logout());
    if (onLogout) onLogout();
    navigate("/");
  };

  return (
    <button className={scss.logoutButton} onClick={handleLogout}>
      <AiOutlineLogout className={scss.icon} />
    </button>
  );
};

export default Logout;
