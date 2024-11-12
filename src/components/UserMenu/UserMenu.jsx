import { useRef, useEffect, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import ThemeSwitcher from '../ThemeSwitcher';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../redux/features/authSlice';
import Notification from '../Notification';
import scss from './UserMenu.module.scss';

const UserMenu = ({ onClose, getUserProfileUrl }) => {
  const menuRef = useRef(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showNotification, setShowNotification] = useState(false);

  const currentUser = useSelector((state) => state.auth.user);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        onClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [onClose]);

  const handleLogout = async () => {
    await dispatch(logout());
    setShowNotification(true);
    navigate('/');
    onClose();
  };

  return (
    <>
      <div className={scss.menuContainer} ref={menuRef}>
        <ul className={scss.menuList}>
          <li className={scss.item}>
            <NavLink to={getUserProfileUrl()} onClick={onClose}>
              Мій профіль
            </NavLink>
          </li>
          {currentUser && (
            <li className={scss.item}>
              <NavLink to={`/user/${currentUser._id}`} onClick={onClose}>
                Мої оголошення
              </NavLink>
            </li>
          )}
          <li className={scss.item}>
            <NavLink to="/chats" onClick={onClose}>
              Мої чати
            </NavLink>
          </li>
          <li className={scss.item}>
            <NavLink to="/cart" onClick={onClose}>
              Кошик
            </NavLink>
          </li>
          <li className={scss.item}>
            <NavLink to="/favorites" onClick={onClose}>
              Обрані
            </NavLink>
          </li>
          <li className={scss.item}>
            <NavLink to="/create" onClick={onClose}>
              Додати оголошення
            </NavLink>
          </li>
          <li className={scss.item}>
            <ThemeSwitcher />
          </li>
          <li className={scss.item}>
            <button className={scss.exitButton} onClick={handleLogout}>
              Вийти
            </button>
          </li>
        </ul>
      </div>
      {showNotification && (
        <Notification
          message="Заходьте ще!"
          onClose={() => setShowNotification(false)}
        />
      )}
    </>
  );
};

export default UserMenu;
