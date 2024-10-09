import { AiOutlineLogout } from 'react-icons/ai';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout } from '../../redux/features/authSlice';
import Tooltip from '@mui/material/Tooltip';
import scss from './Logout.module.scss';

const Logout = ({ onLogout }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await dispatch(logout());
    if (onLogout) onLogout();
    navigate('/');
  };

  return (
    <Tooltip title="Вихід" placement="right">
      <button className={scss.logoutButton} onClick={handleLogout}>
        <AiOutlineLogout className={scss.icon} />
      </button>
    </Tooltip>
  );
};

export default Logout;
