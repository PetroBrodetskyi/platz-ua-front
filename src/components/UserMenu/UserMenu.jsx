import { useRef, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import ThemeSwitcher from '../ThemeSwitcher';
import scss from './UserMenu.module.scss';

const UserMenu = ({ onClose, getUserProfileUrl }) => {
  const menuRef = useRef(null);

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
          <NavLink to="/messages" onClick={onClose}>
            Мої повідомлення
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
      </ul>
    </div>
  );
};

export default UserMenu;
