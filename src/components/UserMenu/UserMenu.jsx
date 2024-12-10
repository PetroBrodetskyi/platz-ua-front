import { useRef, useEffect, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import ThemeSwitcher from '../ThemeSwitcher';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../redux/features/authSlice';
import Notification from '../Notification';
import { GoPerson, GoTasklist } from 'react-icons/go';
import { RiChatSmile2Line, RiLoginCircleLine } from 'react-icons/ri';
import { PiShoppingCart } from 'react-icons/pi';
import { FiPlusCircle } from 'react-icons/fi';
import { MdOutlineFavoriteBorder, MdOutlineClose } from 'react-icons/md';

import { useTheme } from '../../context/ThemeContext.jsx';
import scss from './UserMenu.module.scss';

const UserMenu = ({ onClose, getUserProfileUrl }) => {
  const menuRef = useRef(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showNotification, setShowNotification] = useState(false);
  const { isDarkMode } = useTheme();

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

  const handleClose = () => {
    onClose();
  };

  return (
    <div className={scss.menu}>
      <div
        className={`${scss.menuContainer} ${isDarkMode ? scss.darkMode : ''}`}
        ref={menuRef}
      >
        <ul className={scss.menuList}>
          {currentUser ? (
            <>
              <li className={scss.userInfo}>
                <img
                  src={currentUser.avatarURL || '/path/to/default/avatar.png'}
                  alt={currentUser.name || 'Користувач'}
                  className={scss.avatar}
                />
                <div>
                  <h4>{currentUser.name}</h4>
                  <p>{currentUser.email}</p>
                </div>
              </li>
              <li className={scss.divider}></li>
              <li className={scss.item}>
                <NavLink to={getUserProfileUrl()} onClick={onClose}>
                  <div className={scss.iconItem}>
                    <GoPerson className={scss.icon} />
                    <p>Мій профіль</p>
                  </div>
                </NavLink>
              </li>
              <li className={scss.item}>
                <NavLink to={`/user/${currentUser._id}`} onClick={onClose}>
                  <div className={scss.iconItem}>
                    <GoTasklist className={scss.icon} />
                    <p>Мої оголошення</p>
                  </div>
                </NavLink>
              </li>
            </>
          ) : (
            <li className={scss.userInfo}>
              <p>Будь ласка, увійдіть, щоб побачити свій профіль</p>
            </li>
          )}
          <li className={scss.item}>
            <NavLink to="/chats" onClick={onClose}>
              <div className={scss.iconItem}>
                <RiChatSmile2Line className={scss.icon} />
                <p>Мої чати</p>
              </div>
            </NavLink>
          </li>
          <li className={scss.item}>
            <NavLink to="/cart" onClick={onClose}>
              <div className={scss.iconItem}>
                <PiShoppingCart className={scss.icon} />
                <p>Кошик</p>
              </div>
            </NavLink>
          </li>
          <li className={scss.item}>
            <NavLink to="/favorites" onClick={onClose}>
              <div className={scss.iconItem}>
                <MdOutlineFavoriteBorder className={scss.icon} />
                <p>Обрані</p>
              </div>
            </NavLink>
          </li>
          <li className={scss.item}>
            <NavLink to="/create" onClick={onClose}>
              <div className={scss.iconItem}>
                <FiPlusCircle className={scss.icon} />
                <p>Додати оголошення</p>
              </div>
            </NavLink>
          </li>
          <li className={scss.item}>
            <ThemeSwitcher />
          </li>
          <li className={scss.item}>
            <button className={scss.exitButton} onClick={handleLogout}>
              <div className={scss.iconItem}>
                <RiLoginCircleLine className={scss.icon} />
                <p>Вийти</p>
              </div>
            </button>
          </li>
          <li className={scss.divider}></li>
          <li className={scss.item}>
            <button className={scss.exitButton} onClick={handleClose}>
              <div className={scss.iconItem}>
                <MdOutlineClose className={scss.icon} />
                <p>Закрити</p>
              </div>
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
    </div>
  );
};

export default UserMenu;
