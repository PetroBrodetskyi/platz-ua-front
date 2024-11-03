import { useRef, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import ThemeSwitcher from '../ThemeSwitcher';
import { useDispatch } from 'react-redux';
import { logout } from '../../redux/features/authSlice';
import scss from './UserMenu.module.scss';

const UserMenu = ({ onClose, getUserProfileUrl }) => {
  const menuRef = useRef(null);
  const dispatch = useDispatch();

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
  };

  return (
    <div className={scss.menuContainer} ref={menuRef}>
      <ul className={scss.menuList}>
        <li className={scss.item}>
          <NavLink to={getUserProfileUrl()} onClick={onClose}>
            Мій профіль
          </NavLink>
        </li>
        <li className={scss.item}>
          <NavLink to="/user-ads" onClick={onClose}>
            Мої оголошення
          </NavLink>
        </li>
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
          <ThemeSwitcher />
        </li>
        <li className={scss.item}>
          <button
            className={scss.exitButton}
            onClick={() => {
              handleLogout();
              onClose();
            }}
          >
            Вийти
          </button>
        </li>
      </ul>
    </div>
  );
};

export default UserMenu;
